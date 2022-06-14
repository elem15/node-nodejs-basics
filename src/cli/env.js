const env = process.env;
// console.log(process.env)
export const parseEnv = () => {
    const arrOfRSS = [];
    for (const variable in env) {
        if (variable.startsWith('RSS_')) {
            const expression = `${variable}=${env[variable]}`
            arrOfRSS.push(expression);
        }
    }
    process.stdout.write(arrOfRSS.join('; '))
};

parseEnv();