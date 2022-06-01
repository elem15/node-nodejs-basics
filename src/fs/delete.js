import path from 'path';
import { unlink } from 'fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, 'files', 'fileToRemove.txt');
const fileError = new Error('FS operation failed');

export const remove = async () => {

    try {
        try {
            await unlink(src);
        } catch {
            throw fileError;
        }
    }
    catch (err) {
        if (err.message === 'FS operation failed') console.error(err);
    }

};

remove();