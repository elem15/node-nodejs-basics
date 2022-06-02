import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { createUnzip } from 'zlib';
import { pipeline } from 'stream';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToSrc = path.join(__dirname, 'files','archive.gz' );
const pathToDestination = path.join(__dirname, 'files', 'fileToCompress.txt');

const unzip = createUnzip();
const src = fs.createReadStream(pathToSrc);
const destination = fs.createWriteStream(pathToDestination);
export const decompress = async () => {
    pipeline(
        src,
        unzip,
        destination,
        err => {
            if(err) {
                console.error(err);
            }
        }
    )
};

decompress();