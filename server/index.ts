import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { connect } from './database/db';
import loaders from './loaders';
import { getPagination } from './util/pagination';

async function startServer() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  dotenv.config();

  const symbology = await loaders();

  const db = connect();

  app.use(express.static(path.join(__dirname, '../public')));

  // Serve the static files for the web application from the root path
  app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
  });

  // Instantiate a REST endpoint for retrieving the tickers based on date and pagination.
  app.get('/ticker/:tickerId', async (req, res) => {
    const { params, query } = req;
    const { tickerId } = params;
    const { page, size } = query;
    const pageAsNumber = page ? parseInt(query.page as string) : 0;
    const sizeAsNumber = size ? parseInt(query.size as string): 0;
    const startDate = query.startDate as string;
    const endDate = query.endDate as string;
    const { offset, limit } = getPagination(pageAsNumber, sizeAsNumber);
    if (!startDate || !endDate) {
      res.statusCode = 400;
      res.send('Bad Request: StartDate or EndDate was missing or invalid.');
    } else {
      const singleSymbol = symbology.find(symbol => symbol.ticker === tickerId) || { KID: ''};
      if (!singleSymbol.KID) {
        res.statusCode = 400;
        res.send('Bad Request: Ticker was invalid.');
      }
      db.TickerModel.getPaginated({ KID: singleSymbol?.KID, startDate, endDate, offset, limit })
        .then((data) => {
          res.json({
            totalItems: data.totalDocs,
            tickers: data.docs,
            totalPages: data.totalPages,
            currentPage: (data.page || 0) -1
          });
        });
    }
  });

  app.listen(8080);
};

startServer();