const cluster = require('cluster');
let numCPUs = require('os').cpus().length;
const generateData = require('./quoteGenerator.js');

numCPUs = 7;
let numIndices = 750;

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();  
}

function masterProcess() {
  process.env.UV_THREADPOOL_SIZE = 100;
  let finishCount = 0;
  let writtenHeaders = false;

  const { sgzip } = require('./index.js');
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);
    cluster.fork({i : i * numIndices, workerNumber: i });
  }

  function handleMessage(msg) {
    if (msg.cmd && msg.cmd === 'writeChunk') {
      if (finishCount === 0 && !writtenHeaders) {
        sgzip.write('ticker| price| time_stamp| label\n');
        writtenHeaders = true;
      }
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
  let cb = (chunk, cb) => process.send({
    cmd: 'writeChunk',
    chunk,
  }, cb);
  generateData(i, i + numIndices, cb)
}