import etlLoader from './etlLoader';
import { ITicker } from '../database/ticker/ticker.types';
import { connect, disconnect } from '../database/db';
import staticLoader from './staticLoader';

export default async () => {
    const symbology = await staticLoader();
    const tickerList = await etlLoader();
    await saveFilesInDatabase(tickerList)
    return symbology;
};

const saveFilesInDatabase = async (files: ITicker[]) => {
    const db = connect();

    for (const file of files) {
        await db.TickerModel.findOneOrCreate(file);
    }

    console.log('ETL Pipeline completed. Please load the web application.')
    disconnect();
};