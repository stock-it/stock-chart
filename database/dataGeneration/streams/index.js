const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();
const infoWriter = fs.createWriteStream(__dirname + '/../stockData.csv.gz')

gzip
  .pipe(infoWriter)
  .on('finish', () => console.log('File Written!'));

const qgzip = zlib.createGzip();
const quoteWriter = fs.createWriteStream(__dirname + '/../quoteData.csv.gz')

qgzip
  .pipe(quoteWriter)
  .on('finish', () => console.log('File Written!'));

  module.exports.gzip = gzip;
  module.exports.qgzip = qgzip;