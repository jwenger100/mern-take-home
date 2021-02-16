import etlLoader from './etlLoader';
import { ITicker } from '../database/ticker/ticker.types';
import { connect, disconnect } from '../database/db';

export default async () => {
    const tickerList = await etlLoader();
    await saveFilesInDatabase(tickerList)
    return tickerList;
};

const saveFilesInDatabase = async (files: ITicker[]) => {
    const db = connect();

    for (const file of files) {
        await db.TickerModel.findOneOrCreate(file);
    }

    console.log('completed.')
    disconnect();
};