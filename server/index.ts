import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import loaders from './loaders';
import dotenv from 'dotenv';

async function startServer() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  dotenv.config();

  const tickers = await loaders();

  app.use(express.static(path.join(__dirname, '../build')));

  //Serve the static files for the web application from the root path
  app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
  });

  app.get('/ticker/:tickerId', async (req, res) => {
    const { params, query } = req;
    const { tickerId } = params;
    const { startDate, endDate }  = query;
    if (!startDate || !endDate) {
      res.statusCode = 400;
      res.send('Bad Request: StartDate or EndDate was missing or invalid.');
    } else {
      const responseTickers = tickers.filter(ticker => {
        return ticker.date >= startDate && ticker.date <= endDate && ticker.ticker === tickerId;
      });
      res.json(responseTickers);
    }
  });

  app.listen(8080);
};

startServer();