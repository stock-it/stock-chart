const fs = require('fs');
const zlib = require('zlib');

const sgzip = zlib.createGzip();
const infoWriter = fs.createWriteStream(__dirname + '/../stockData.csv.gz')

sgzip.on('error', err => console.log(err));
infoWriter.on('error', err => console.log(err));

sgzip
  .pipe(infoWriter)
  .on('finish', () => console.log('File Written!'));


  module.exports.sgzip = sgzip;