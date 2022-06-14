import path from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, 'files', 'fileToRead.txt');
const fileError = new Error('FS operation failed');

export const read = async () => {

    try {

        try {
           const data = await readFile(src, 'utf-8');
           console.log(data);
        } catch {
            throw fileError;
        }
        
    } catch(err) {
        console.error(err);
    }

};

read();