'use strict'

import winston from "winston";
import * as Transport from 'winston-transport';
import Signals = NodeJS.Signals;
import {applicationName} from "../config";

export interface Message{
    level: string,
    message: string,
    origin: string,
    origin_generated_at: number,
    connection_id: string | null,
    service: string
}

export abstract class abstractLogger {

    protected logger: any;

    protected abstract getTransports(): Transport[];

    constructor() {
        this.logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            ),
            transports: this.getTransports(),
        });

        this.setExitListeners()
    }

    public logLocalError(error: Error) {
        this.logObject({
            level: 'error',
            message: error.message,
            origin: applicationName,
            origin_generated_at: Date.now(),
            connection_id: null,
            service: applicationName
        });
    }

    public logObject(message: Message) {
        this.logger.log(message);
    }

    private setExitListeners() {

        const signalsToIntercept: Signals[] = [
            'SIGINT',
            'SIGUSR1',
            'SIGUSR2',
        ];

        signalsToIntercept.forEach((signal: Signals) => {
            process.on(signal, () => {
                this.exitHandler().then(() => process.exit(0));
            });
        })
    }

    private exitHandler() {
        return new Promise(resolve => {
            this.logger.on('finish', () => {
                setTimeout(() => {
                    resolve()
                }, 500);
            });
            this.logger.end();
        })

    }
}