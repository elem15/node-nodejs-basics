import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToFile = path.join(__dirname, 'files', 'fileToRead.txt')


export const read = async () => {
    const stream = fs.createReadStream(pathToFile);
    stream.on('data', (chunk) => {
        process.stdout.write(chunk);
    })
};

read();