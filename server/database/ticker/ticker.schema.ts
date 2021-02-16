import { Schema } from 'mongoose';
import { findOneOrCreate } from './ticker.statics';

const TickerSchema: Schema = new Schema({
  KID: { type: String, required: true },
  ISIN: { type: String, required: true },
  acmeAssetID: { type: Number, required: true },
  nav: { type: Number, required: true },
  adjustedPrice: { type: Number, required: true },
  date: { type: String, required: true },
  ticker: { type: String, required: true },
  qualifiedTicker: { type: String, required: true },
  dateOfEntry: {
    type: Date,
    default: new Date()
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  }
});

TickerSchema.statics.findOneOrCreate = findOneOrCreate as any;

export default TickerSchema;