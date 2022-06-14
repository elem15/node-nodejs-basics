
import path from 'path';
import { access, writeFile } from 'fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToFile = path.join(__dirname, 'files', 'fresh.txt');

export const create = async () => {

    // try {
    //     await access(pathToFile);
    //     throw new Error('FS operation failed');
    // } catch (err) {
    //     if (err.message === 'FS operation failed') console.error(err);
    //     else await writeFile(pathToFile, 'I am fresh and young');
    // }

    try {
        await writeFile(pathToFile, 'I am fresh and young', { flag: 'wx' });
    } catch(err) {
        throw new Error('FS operation failed');
    }

};

create();