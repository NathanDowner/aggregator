const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/*', (req, res) => {
  const url = req.params[0];
  // return res.status(200).json({ url });
  request(url, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      console.log(error.message);
      return res.status(500).json({ type: 'error', message: error.message });
    }

    res.set('Content-Type', 'application/rss+xml');
    res.status(200).send(Buffer.from(body));
  });
});

const PORT = process.env.PORT || 4050;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
