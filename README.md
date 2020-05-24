# Logging Microservice

A simple microservice which handles all the application logs and ships them to Logz.io

## Technologies
- Typescript
- Kafka
- Schema Registry

## Installation
1. Copy the `.env.example` to `.env` and populate with secrets
1. Run `npm install`
1. Run 
1. Run either `npm start` or `docker-compose up` to start the service 

## Scaling
This application uses a consumer group to manage the consuming from the kafka topic. 
