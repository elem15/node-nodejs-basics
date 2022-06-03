import path from 'path';
import { argv } from 'process';
import { fileURLToPath } from 'node:url';
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToWorker = path.join(__dirname, 'worker.js');

const num = argv[2];

export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
  if (isMainThread) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(pathToWorker, {
        workerData: String(nthFibonacci)
      });
      worker.postMessage(num);
      worker.on('message', msg => console.log('Worker send message:', msg));
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  } else {
    parentPort.once('message', (message = 7) => {
      const result = eval(workerData)(message);
      parentPort.postMessage(result);
    })
  }
};

sendResult();