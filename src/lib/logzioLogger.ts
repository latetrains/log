import {abstractLogger} from "./abstractLogger";
import LogzioWinstonTransport from "winston-logzio";
import * as Transport from 'winston-transport';

export class logzioLogger extends abstractLogger {

    protected getTransports(): Transport[] {
        const logzioWinstonTransport = new LogzioWinstonTransport({
            level: 'info',
            bufferSize: 1,
            name: 'winston_logzio',
            token: process.env.LOGZIO_TOKEN as string,
            type: 'application',
        });

        return [logzioWinstonTransport];
    }
}