import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
  if (isMainThread) {
    const worker = new Worker('./wt/worker1.js', { workerData: 7 });
    worker.once('message', (message) => {
      console.log(message);  // Prints 'Hello, world!'.
    });
    worker.postMessage(nthFibonacci(workerData));
  } else {
    // When a message from the parent thread is received, send it back:
    parentPort.once('message', (message) => {
      parentPort.postMessage(message);
    });
  }
}
sendResult();