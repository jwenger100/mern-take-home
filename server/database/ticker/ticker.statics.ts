import { ITickerDocument, ITickerModel } from './ticker.types';
export async function findOneOrCreate(
  this: ITickerModel,
  {
    date,
    nav,
    KID,
    ticker,
    qualifiedTicker,
    ISIN,
    acmeAssetID,
    adjustedPrice
  }: {
    date: string,
    nav: number,
    KID: string,
    ticker: string, 
    qualifiedTicker: string, 
    ISIN: string, 
    acmeAssetID: number, 
    adjustedPrice: number
  }
): Promise<ITickerDocument> {
  const record = await this.findOne({ KID, date });
  if (record) {
    return record;
  } else {
    return this.create({ date,
        nav,
        KID,
        ticker, 
        qualifiedTicker, 
        ISIN, 
        acmeAssetID, 
        adjustedPrice });
  }
}