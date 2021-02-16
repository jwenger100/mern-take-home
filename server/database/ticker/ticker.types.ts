import { Document, Model } from 'mongoose';

export interface ITicker {
    date: string;
    nav: number;
    KID: string;
    ticker: string;
    qualifiedTicker: string;
    ISIN: string;
    acmeAssetID: number;
    adjustedPrice: number;
    dateOfEntry?: Date;
    lastUpdated?: Date;
}

export interface ITickerDocument extends ITicker, Document {}
export interface ITickerModel extends Model<ITickerDocument> {
    findOneOrCreate: (
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
      ) => Promise<ITickerDocument>;
}