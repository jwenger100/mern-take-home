import path from 'path';
import { readFile } from '../util/fileReader';

interface ISymbology {
  KID: string;
  ticker: string;
  qualifiedTicker: string;
  ISIN: string;
  acmeAssetID: number;
}

// Read static ids as part of the "ETL" pipeline for mapping tickers to KID indexed key.
export default (): ISymbology[] => {
  const symbology: ISymbology[] = [];
  // Read the symbols for the ticker from the symbology definition
  readFile<ISymbology>(symbology, path.join(__dirname, '/../data/inputs/koyfinSymbologyService.json'), onError);
  return symbology;
};

function onError (err: NodeJS.ErrnoException) {
    throw err;
};