const { PassThrough } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

const infoPass = new PassThrough();
const gzipInfo = zlib.createGzip();
const infoWriter = fs.createWriteStream(__dirname + '/../stockData.csv.gz')

infoPass
  .pipe(gzipInfo)
  .pipe(infoWriter)
  .on('finish', () => console.log('File Written!'));

const quotePass = new PassThrough();
const quoteCompressor = zlib.createGzip();
const quoteWriter = fs.createWriteStream(__dirname + '/../stockData.csv.gz')

quotePass
  .pipe(quoteCompressor)
  .pipe(quoteWriter)
  .on('finish', () => console.log('File Written!'));

  module.exports.infoPass = infoPass;
  module.exports.quotePass = quotePass;