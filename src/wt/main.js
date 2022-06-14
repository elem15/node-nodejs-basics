import path from 'path';
import os from 'os';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToWorker = path.join(__dirname, 'worker.js');

export const performCalculations = async () => {
    const numberOfCores = os.cpus().length;
    let count = 10;
    const arrOfNumbers = [];
    for (let i = 0; i < numberOfCores; i++) {
        arrOfNumbers.push(count);
        count += 1;
    }
    const workers = arrOfNumbers.map(num => {
        return new Promise((resolve, reject) => {
            const worker = new Worker(pathToWorker, {
                workerData: num,
            });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`Worker stopped with code ${code}`));
            });
        })
    });
    const arrOfResults = await Promise.allSettled(workers);
    const convertedResults = [];
    for (const worker of arrOfResults) {
        const status = worker.status === 'fulfilled' ? 'resolved' : 'error';
        const data = worker.value ?? null;
        const obj = {
            status,
            data
        };
        convertedResults.push(obj);
    }
    return convertedResults;
}
console.log(await performCalculations());