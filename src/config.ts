import {ConsumerGroupOptions} from "kafka-node";

export const applicationName = process.env.APP_NAME || 'none-set';

export const schemaRegistryUrl: string = process.env.SCHEMA_REGISTRY_URL || 'localhost';

export const registryAuthentication: any = {
    username: process.env.SCHEMA_REGISTRY_API_KEY,
    password: process.env.SCHEMA_REGISTRY_API_SECRET
}

export let consumerGroupOptions: ConsumerGroupOptions = {
    kafkaHost: process.env.KAFKA_BROKER_URL,
    sasl: {
        username: process.env.API_KEY,
        password: process.env.API_SECRET,
        mechanism: 'PLAIN'
    },
    sslOptions: {
        rejectUnauthorized: true
    },
    ssl: true,
    groupId: 'LogMessageGroup',
    sessionTimeout: 15000,
    protocol: ['roundrobin'],
    encoding: 'buffer',
    fromOffset: 'latest',
    outOfRangeOffset: 'earliest',
};