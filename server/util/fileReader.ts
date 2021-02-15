import fs from 'fs';

export function readFile<T>(data: T[], filePath: string, onError: (err: NodeJS.ErrnoException) => void) {
   try {
        const stockTickerData = fs.readFileSync(filePath);
        let parsedFile = JSON.parse(stockTickerData.toString());
        if (Array.isArray(parsedFile)) {
            parsedFile = parsedFile[0];
        }
        data.push(parsedFile);
   } catch (exception) {
       onError(exception);
   }
   return data;
}

export function readFilesInDirectory<T>(directoryPath: string, onError: (err: NodeJS.ErrnoException) => void) {
    const data: T[] = [];
    try {
        const fileNames = fs.readdirSync(directoryPath);
        fileNames.forEach(file => readFile<T>(data, directoryPath + file, onError));
    } catch (exception) {
        onError(exception);
    }
    
    return data;
}