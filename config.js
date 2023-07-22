// The string must match the service name for the RabbitMQ server under the
// `services:` root element in docker-compose.yml. It was 'localhost' before
// containerization.
const AMQP_SERVER = 'rabbitmq-server';

const RABBIT_MQ = Object.freeze({
  URL: `amqp://${AMQP_SERVER}`,
  EXCHANGE_NAME: 'log-exchange',
  QUEUE_NAME: 'log-queue',
  BINDING_KEY: 'log',
});

module.exports = {
  RABBIT_MQ,
}