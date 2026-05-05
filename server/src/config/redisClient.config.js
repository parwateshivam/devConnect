import { createClient } from 'redis';
import { envConfig } from '../config/env.config.js';

const redisClient = createClient({
    username: envConfig.REDIS_USERNAME,
    password: envConfig.REDIS_PASSWORD,
    socket: {
        host: envConfig.REDIS_HOST,
        port: envConfig.REDIS_PORT
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();

export default redisClient;