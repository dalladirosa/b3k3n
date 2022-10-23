import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import fetch from 'node-fetch';

const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/categories', async (req, res) => {
  try {
    const respond = await fetch(
      'https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories'
    );
    const data = await respond.json();
    res.send(JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
});

app.get('/api/books', async (req, res) => {
  const { categoryId, page = 0, size } = req.query;

  try {
    const respond = await fetch(
      `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${categoryId}&page=${page}&size=${size}`
    );
    const data = await respond.json();

    res.send(JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
