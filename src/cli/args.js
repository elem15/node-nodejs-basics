const env = process.argv.slice(2);

export const parseArgs = () => {
    for (let i = 0; i < env.length; i++) {
        const arg = env[i];
        const prefix = arg.slice(2);
        if (env[i + 1]) {
            const expression = `${prefix} is ${env[i + 1]}, `
            process.stdout.write(expression);
            i++;
        }
    }
};

parseArgs();