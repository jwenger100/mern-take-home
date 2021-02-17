import { PaginateResult } from 'mongoose';
import { ITickerDocument, ITickerModel } from './ticker.types';
import moment from 'moment';


export async function findOneOrCreate(
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
): Promise<ITickerDocument> {
  const record = await this.findOne({ KID, date });
  if (record) {
    return record;
  } else {
    return this.create({ 
      date: moment(date).toDate(),
      nav,
      KID,
      adjustedPrice 
    });
  }
}

export async function getPaginated(
  this: ITickerModel,
  {
    KID,
    startDate,
    endDate,
    offset,
    limit
  }: {
    KID: string,
    startDate: Date,
    endDate: Date,
    offset: number,
    limit: number
  }
): Promise<PaginateResult<ITickerDocument>> {
  const query = { 
    KID, 
    date: { 
      $gte: moment(startDate).toDate(),
      $lte: moment(endDate).toDate()
    }
  };
  return this.paginate(query, { offset, limit });
}