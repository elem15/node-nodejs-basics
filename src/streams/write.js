import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToFile = path.join(__dirname, 'files', 'fileToWrite.txt')

export const write = async () => {
    const stream = fs.createWriteStream(pathToFile);
    process.stdin.pipe(stream);
}

write();