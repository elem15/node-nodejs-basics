import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToSrc = path.join(__dirname, 'files', 'fileToCompress.txt');
const pathToDestination = path.join(__dirname, 'files', 'archive.gz');

const gzip = createGzip();
const src = fs.createReadStream(pathToSrc);
const destination = fs.createWriteStream(pathToDestination);

export const compress = async () => {
    pipeline(
        src,
        gzip,
        destination,
        err => {
            if(err) {
                console.error(err);
                process.exitCode = 1;
            }
        }
    )
};

compress();