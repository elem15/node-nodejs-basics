// чтобы увидеть работу worker, 
// вызовите файл index.js с одним целым числом после имени файла (node .\wt\index.js 9)

import path from 'path';
import { argv } from 'process';
import { Worker } from 'worker_threads';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToWorker = path.join(__dirname, 'worker.js');

const num = argv[2] ?? 7;

const worker = new Worker(pathToWorker, { workerData: num });

worker.on('message', msg => console.log('Worker send message:', msg));
