// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const request = require('request');

export default function getFeed(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // res.status(200).json(req.query.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    const url = req.query.url;
    request(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.log(error.message);
        return res.status(500).json({ type: 'error', message: error.message });
      }
      res.setHeader('Content-Type', 'application/rss+xml');
      res.status(200).send(Buffer.from(body));
    });
  }

  if (req.method === 'POST') {
    res.status(200).json(req.body);
  }
}
