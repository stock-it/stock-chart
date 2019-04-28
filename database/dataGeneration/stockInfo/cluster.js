const cluster = require('cluster');
let numCPUs = require('os').cpus().length;
const generateData = require('./stockGenerate.js');

process.env.UV_THREADPOOL_SIZE = 50;
numCPUs = 8;
let numIndices = 6250;

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();  
}

function masterProcess() {
  let finishCount = 0;

  const { sgzip } = require('./index.js');
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);
    cluster.fork({i : i * numIndices, workerNumber: i });
  }

  function handleMessage(msg) {
    if (msg.cmd && msg.cmd === 'writeChunk') {
      if (finishCount === 0) sgzip.write('id|ticker|average_stock|change_percent|company|num_owners|recommendation_percent|related_tags\n');
      sgzip.write(msg.chunk, 'utf8');
    } else if (msg.cmd === 'done') {
      finishCount++;
      if (finishCount === numCPUs) sgzip.end(() => {
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
  let cb = (chunk) => process.send({
    cmd: 'writeChunk',
    chunk,
  }, () => {
    process.send({cmd: 'done'});
    console.log(`worker ${process.pid} finished`);
    process.exit();
  });
  generateData(i, i + numIndices, cb)
}