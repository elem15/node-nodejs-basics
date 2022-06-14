const env = process.argv.slice(2);
console.log(env)
export const parseArgs = () => {
    const arr = [];
    for (let i = 0; i < env.length; i++) {
        const arg = env[i];
        const prefix = arg.slice(2);       
        if (env[i + 1]) {
            const expression = `${prefix} is ${env[i + 1]}`;
            arr.push(expression);
            i++;
        }
    }
    process.stdout.write(arr.join(', '));
};

parseArgs();