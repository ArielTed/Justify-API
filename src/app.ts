import express from 'express';
import cors from 'cors';

import { router } from './routes';

const app = express();

app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('json spaces', 2);
app.use(cors());

app.use('/api', router);

app.get('/', (req, res) => {
  return res.send(`
  <div style="text-align: center; margin-top: 33vh;">
    <h1> TicTacTrip Justify API </h1>
    <a href="https://github.com/ArielTed/Justify-API" target="_blank"> GitHub repo </a>
    <p> Author: Ariel Tedgui </p>
  </div>
  `);
});

export { app };
