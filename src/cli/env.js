const env = process.argv.slice(2);

export const parseEnv = () => {
    for (let i = 0; i < env.length; i++) {
        const arg = env[i];
        const prefix = arg.slice(0, 4);
        if (prefix === 'RSS_') {
            if (env[i + 1]) {
                const expression = `${arg}=${env[i + 1]}; `
                process.stdout.write(expression);
                i++;
            }
        }
    }
};

parseEnv();