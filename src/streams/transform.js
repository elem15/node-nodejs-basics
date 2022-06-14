import { pipeline } from 'stream';
import { Transform } from 'stream';
import { stdin, stdout } from 'process';

const invite = '\n\nEnter a new text to reverse:\n'

const myTransform = new Transform({
    writableObjectMode: true,
    transform(chunk, _, callback) {
        const data = chunk.toString().split('').reverse().join('');
        callback(null, data + invite);
    },
});

export const transform = async () => {
    stdout.write(invite);
    pipeline(
        stdin,
        myTransform,
        stdout,
        (err) => console.error(err)
    )
    // stdin.pipe(myTransform).pipe(stdout);
};

transform();