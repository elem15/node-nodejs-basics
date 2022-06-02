import path from 'path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'fs/promises';
const { createHmac } = await import('crypto');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToFile = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt')

export const calculateHash = async () => {
    const data = await readFile(pathToFile, 'utf-8');
    const hash = createHmac('sha256', 'password')
               .update(data)
               .digest('hex');
    return hash;
};

console.log(await calculateHash());