'use strict'
import dotenv from 'dotenv';

dotenv.config();
import schema, {ISchemaRegistry} from "avro-schema-registry";
import {Message, ConsumerGroup} from 'kafka-node';
import {
    applicationName,
    consumerGroupOptions,
    registryAuthentication,
    schemaRegistryUrl,
} from "./config";
import {logzioLogger} from "./lib/logzioLogger";

const logger = new logzioLogger();

const consumer: ConsumerGroup = new ConsumerGroup(consumerGroupOptions, ['logs']);

const registry: ISchemaRegistry = schema(schemaRegistryUrl, registryAuthentication);

consumer.on('message', (message: Message) => {
    if (message.value !== null) {
        return logger.logLocalError(new Error('Consumer has received a message that is null'));
    }

    registry.decode(message.value as Buffer)
        .then((decodedMessage: any) => {
            logger.logObject({
                level: decodedMessage.level,
                message: decodedMessage.message,
                origin: decodedMessage.origin,
                origin_generated_at: decodedMessage.origin_generated_at,
                connection_id: decodedMessage.connection_id,
                service: applicationName
            });
        })
        .catch((error: Error) => logger.logLocalError(error));
});

consumer.on('error', (error: Error) => logger.logLocalError(error));