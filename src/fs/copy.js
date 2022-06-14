import path from 'path';
import { copyFile, readdir, mkdir } from 'fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files_copy');

export const copy = async () => {

    try {
        const pathToFiles = await readdir(src);
        await mkdir(destination, { recursive: false });
        for (const file of pathToFiles) {
            const srcFilePath = path.join(src, file);
            const destinationFilePath = path.join(destination, file);
            await copyFile(srcFilePath, destinationFilePath);
        }
    } catch {
        throw new Error('FS operation failed');
    }

    // try {
    //     try {
    //         const pathToFiles = await readdir(src);
    //         await mkdir(destination); 
    //         for (const file of pathToFiles) {
    //             const srcFilePath = path.join(src, file);
    //             const destinationFilePath = path.join(destination, file);
    //             await copyFile(srcFilePath, destinationFilePath);
    //         }
    //     } catch {
    //         throw new Error('FS operation failed');            
    //     }
    // } catch(err) {
    //     console.error(err);
    // }

};

copy();