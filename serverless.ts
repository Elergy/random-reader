import type { AWS } from '@serverless/typescript';

import { telegram } from './src/functions';

const serverlessConfiguration: AWS = {
    service: 'random-reader',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
    },
    plugins: ['serverless-webpack'],
    provider: {
        name: 'aws',
        runtime: 'nodejs12.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        },
        lambdaHashingVersion: '20201221',
        stage: 'dev',
        region: 'eu-west-2',
    },
    functions: { telegram },
};

module.exports = serverlessConfiguration;
