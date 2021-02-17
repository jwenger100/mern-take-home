import moment from 'moment';
import path from 'path';
import { readFile, readFilesInDirectory } from '../util/fileReader';
import { ITicker } from '../database/ticker/ticker.types';

interface ITickerInput {
  date: string;
  assetId: number;
  nav: string;
  adjustmentFactor: string;
}

interface ISymbology {
  KID: string;
  ticker: string;
  qualifiedTicker: string;
  ISIN: string;
  acmeAssetID: number;
}

// Read files as part of the "ETL" pipeline for taking in stock ticker content.
export default (): ITicker[] => {
  const symbology: ISymbology[] = [];
  // Read the symbols for the ticker from the symbology definition
  readFile<ISymbology>(symbology, path.join(__dirname, '/../data/inputs/koyfinSymbologyService.json'), onError);
  const symbols = symbology[0];
  // Read the input files from each of the dates in the input directory.
  const files = readFilesInDirectory<ITickerInput>(path.join(__dirname, '/../data/inputs/json/'), onError);

  // Get the most recent adjustment factor to use to calculate the adjusted price.
  let mostRecentAdjFactor = 0;
  for (let i = files.length -1; i >= 0; i--) {
    const adjFactor = files[i].adjustmentFactor;
    if (adjFactor) {
      mostRecentAdjFactor = parseFloat(adjFactor);
      break;
    }
  }
  // Get the last adjustment factor from a chronological perspective.
  // If a later item does not have an adjustment factor, we use the one that preceeded it.
  let lastAdjustmentFactor = 0;
  // Map the objects into the format we want to log to the datastore.
  return files.map(file => {
    const { adjustmentFactor, date, nav } = file;
    const navAsFloat = parseFloat(nav);
    if (adjustmentFactor) {
      lastAdjustmentFactor = parseFloat(adjustmentFactor);
    }
    // formula to compute adjusted price
    const adjustedPrice = navAsFloat * lastAdjustmentFactor / mostRecentAdjFactor;
    const mappedItem: ITicker = {
      KID: symbols.KID,
      date: moment(date).toDate(),
      nav: navAsFloat,
      adjustedPrice
    };
    return mappedItem;
  });
};

function onError (err: NodeJS.ErrnoException) {
  throw err;
};