import * as amqplib from 'amqplib';

export const connectToRabbitAndCreateChannel = async (amqp_url: string) => {
  try {
    const connection = await amqplib.connect(amqp_url);
    console.log('Connected to ampq server');
    const channel = await connection.createChannel();
    return { connection, channel };
  } catch (error) {
    console.error('Rabbit error: ', error);
    return null;
  }
};
