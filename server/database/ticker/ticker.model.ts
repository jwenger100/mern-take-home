import { model } from 'mongoose';
import { ITickerDocument, ITickerModel } from './ticker.types';
import TickerSchema from './ticker.schema';
export const TickerModel = model<ITickerDocument, ITickerModel>('Ticker', TickerSchema) as ITickerModel;