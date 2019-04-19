const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const generateData = require('./dataGenerator.js');

process.env.UV_THREADPOOL_SIZE = 50;

let currentIndex = 0;
const totalRecords = 800;

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();  
}

function masterProcess() {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);
    cluster.fork();
  }

  process.exit();
}

function childProcess() {
  console.log(`Worker ${process.pid} started`);
  let newIndex = currentIndex + totalRecords/numCPUs;
  generateData(currentIndex, newIndex)
  currentIndex = newIndex;
  console.log(`Worker ${process.pid} finished`);
  process.exit();
}