import { Schema } from 'mongoose';
import { findOneOrCreate, getPaginated } from './ticker.statics';
import mongoosePaginate from 'mongoose-paginate-v2';

const TickerSchema: Schema = new Schema({
  KID: { type: String, required: true },
  nav: { type: Number, required: true },
  adjustedPrice: { type: Number, required: true },
  date: { type: Date, required: true },
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
TickerSchema.statics.getPaginated = getPaginated as any;

TickerSchema.plugin(mongoosePaginate);

export default TickerSchema;