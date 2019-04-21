const cluster = require('cluster');
let numCPUs = require('os').cpus().length;
const generateData = require('./dataGenerator.js');

process.env.UV_THREADPOOL_SIZE = 50;
numCPUs = 8;
let numIndices = 625000;

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();  
}

function masterProcess() {
  let finishCount = 0;

  const { sgzip } = require('./streams/index.js');
  sgzip.write('id, stockId, stockCompany, relatedTags, noOfOwners, recommendationPercent \n');
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);
    cluster.fork({i : i * numIndices, workerNumber: i });
  }

  function handleMessage(msg) {
    if (msg.cmd && msg.cmd === 'writeChunk') {
      sgzip.write(msg.chunk, 'utf8', () => console.log('completed write'));
    } else if (msg.cmd === 'done') {
      finishCount++;
      if (finishCount === numCPUs) sgzip.end('\n', 'utf8', () => {
        console.log(`${finishCount} workers completed`);
      });
    }
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', handleMessage);
  }
}

function childProcess() {
  console.log(`Worker ${process.pid} started`);
  let { i } = process.env;
  i = Number(i);
  let cb = (chunk) => process.send({ cmd: 'writeChunk', chunk, });
  generateData(i, i + numIndices, cb, () => {
    process.send({cmd: 'done'});
    console.log(`worker ${process.pid} finished`);
    process.exit()
  });
}