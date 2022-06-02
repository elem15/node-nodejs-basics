import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { fileURLToPath } from 'node:url';
import { createRequire } from "module"; 
const require = createRequire(import.meta.url);
import './files/c.js';

// import * as a from './files/a.json' assert { type: 'json' };
// import * as b from './files/b.json' assert { type: 'json' };
// to use these imports it's need to run file as "node --experimental-json-modules .\modules\cjsToEsm.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = path.basename(fileURLToPath(import.meta.url));

const random = Math.random();

let unknownObject;
const a = require('./files/a.json');
const b = require('./files/b.json');

if (random > 0.5) {
    unknownObject = a;
} else {
    unknownObject = b;
}

console.log(unknownObject);
console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const createMyServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

export default {
    unknownObject,
    createMyServer,
};