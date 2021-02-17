import { Document, PaginateModel, PaginateResult } from 'mongoose';
export interface ITicker {
    date: Date;
    nav: number;
    KID: string;
    adjustedPrice: number;
    dateOfEntry?: Date;
    lastUpdated?: Date;
}

export interface ITickerDocument extends ITicker, Document {}
export interface ITickerModel extends PaginateModel<ITickerDocument> {
    findOneOrCreate: (
        this: ITickerModel,
        {
          date,
          nav,
          KID,
          adjustedPrice
        }: {
            date: Date,
            nav: number,
            KID: string,
            adjustedPrice: number
          }
      ) => Promise<ITickerDocument>;
    
      getPaginated: (
        this: ITickerModel,
        {
          KID,
          startDate,
          endDate,
          offset,
          limit
        }: {
          KID: string;
          startDate: string;
          endDate: string;
          offset: number;
          limit: number;
        }
      ) => Promise<PaginateResult<ITickerDocument>>;
}