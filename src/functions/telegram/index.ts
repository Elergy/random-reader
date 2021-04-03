import { config as loadEnv } from 'dotenv';

loadEnv();

export default {
    handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
    memorySize: 128,
    events: [
        {
            http: {
                method: 'post',
                path: 'telegram',
                cors: true,
            },
        },
    ],
    environment: {
        TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
    },
};
