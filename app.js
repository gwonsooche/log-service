const amqp = require('amqplib');
const {RABBIT_MQ} = require('./config');

/**
 * Consumes the messages from the RabbitMQ server that correspond to logs from
 * the main server.
 */
async function consumeLog() {
  const connection = await amqp.connect(RABBIT_MQ.URL);
  const channel = await connection.createChannel();

  const exchangeName = RABBIT_MQ.EXCHANGE_NAME;
  // Assert the exchange into existence.
  await channel.assertExchange(exchangeName, 'direct');
  // Assert the queue into existence.
  const queue = await channel.assertQueue(RABBIT_MQ.QUEUE_NAME);
  // Assert the routing path from the exchange to the queue.
  await channel.bindQueue(queue.queue, exchangeName, RABBIT_MQ.BINDING_KEY);

  // Set up this consumer with a callback to be invoked with each message.
  channel.consume(queue.queue, (log) => {
    const asObj = JSON.parse(log.content.toString());
    console.log(asObj);

    // Notify the RabbitMQ server that the message (log) has been consumed
    // successfully. Then the producer will be notified. If this consumer didn't
    // acknowledge, then the message would remain in the queue. Even after this
    // microservice restarts, the RabbitMQ queue would still have the message,
    // and this consumer would consume the same message again.
    channel.ack(log);
  });
}

consumeLog();