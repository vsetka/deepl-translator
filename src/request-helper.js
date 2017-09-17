const https = require('https');

module.exports = (options, postBody) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      res.setEncoding('utf8');
      res.on('data', body => resolve(JSON.parse(body)));
    });

    req.on('error', reject);
    req.write(JSON.stringify(postBody));
    req.end();
  });
};
