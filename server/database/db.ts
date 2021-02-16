import mongoose from 'mongoose';
import { TickerModel } from './ticker/ticker.model';

let database: mongoose.Connection;

export const connect =  () => {
    const uri = (process.env.ATLAS_URI as string);

    mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
    database = mongoose.connection;

    database.once('open', () => {
        console.log('MongoDB database connection established successfully');
    });

    database.on('error', () => {
      console.log('Error connecting to database');
    })
    
    return {
        TickerModel
    };
};

export const disconnect = () => {
    if (!database) {
        return;
    }
    mongoose.disconnect();
};