import express, { Application } from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';

const app: Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/categories', async (req, res) => {
  const { categoryId, page = 0, size } = req.query;
  const respond = await fetch(
    'https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories'
  );
  const data = await respond.json();
  res.send(JSON.stringify(data));
});

app.get('/api/books', async (req, res) => {
  const respond = await fetch(
    'https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books'
  );
  const data = await respond.json();
  res.send(JSON.stringify(data));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
