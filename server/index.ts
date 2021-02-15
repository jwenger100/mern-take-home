import express from 'express';
import path from 'path';
import loaders from './loaders';

async function startServer() {
  const app = express();

  const tickers = await loaders();
  for (let i = tickers.length -1; i >= tickers.length-30; i--) {
    console.log(tickers[i]);
  }
  //console.log(tickers);

  app.use(express.static(path.join(__dirname, '../build')));

  //Serve the static files for the web application from the root path
  app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
  });

  app.listen(8080);
};

startServer();