import path from 'path';
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, 'files');
const fileError = new Error('FS operation failed');

export const list = async () => {

    try {

        try {
            const pathsToFiles = await readdir(src);
            for (const pathToFile of pathsToFiles) {
                process.stdout.write(pathToFile + '\n');
            }
        } catch {
            throw fileError;
        }
        
    } catch(err) {
        console.error(err);
    }

};

list();