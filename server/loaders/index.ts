import etlLoader from './etlLoader';

export default async () => {
    const tickerMap = await etlLoader();
    return tickerMap;
};