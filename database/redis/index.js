const redis = require('redis');
const helpers = require('../../server/routes/helpers');

const port = process.env.REDISPORT || 6379;
const host = process.env.REDISHOST || '127.0.0.1';
// can set optional port/host as an argument to client
const client = redis.createClient(port, host);

client.on('connect', () => {
  console.log(`Redis connected on port ${port}`)
});

client.on('error', err => {
  console.error(`Redis Error: ${err}`)
});

module.exports = {
  set: (key, value) => {
    // expires each cache item daily to account for new "daily stocks";
    const seconds = helpers.secondsUntilEOD();
    return client.setex(key, value, 'EX', seconds);
  },
  get: (key, cb) => {
    return client.get(key, (err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(null, result);
      }
    });
  }
}