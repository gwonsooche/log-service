const AMQP_SERVER = 'localhost';

const RABBIT_MQ = Object.freeze({
  URL: `amqp://${AMQP_SERVER}`,
  EXCHANGE_NAME: 'log-exchange',
  QUEUE_NAME: 'log-queue',
  BINDING_KEY: 'log',
});

module.exports = {
  RABBIT_MQ,
}