import path from 'path';
import { access, rename as fileRename } from 'fs/promises';
import { fileURLToPath } from 'node:url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, 'files', 'wrongFilename.txt');
const destination = path.join(__dirname, 'files', 'properFilename.md');
const fileError = new Error('FS operation failed');

export const rename = async () => {   
    try {
        try {
            await access(destination);
            throw fileError;
        } catch (err) {
            if (err.message === 'FS operation failed') {
                console.error(err);
                return;
            }
            try {
                await fileRename(src, destination);
            } catch {
                throw fileError;
            }
        }
    } catch (err) {
        if (err.message === 'FS operation failed') console.error(err);
    }
};

rename();