import path from 'path';
import { fork } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const args = process.argv.slice(2);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const spawnChildProcess = async (args) => {
    const child = fork(path.join(__dirname, 'files', 'script.js'), args);

    // child.on('message', (msg) => {
    //     process.stdout.write(`Message from child process: ${msg.toString()}\n`)
    // })

    child.on("close", (code) => {
        console.log("child process exited with code " + code);
    });
};

spawnChildProcess(args);