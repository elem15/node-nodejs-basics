// чтобы увидеть работу этого worker, 
// вызовите файл index.js с одним целым числом после имени файла (node .\wt\index.js 9)

import { workerData, parentPort } from 'worker_threads';

// n should be received from main thread
export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
    // This function sends result of nthFibonacci computations to main thread
    const result = nthFibonacci(workerData);
    // parentPort
    parentPort.postMessage(result);
};

sendResult();
