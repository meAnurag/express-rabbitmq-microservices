import { createExpressApp, startServer } from '@minex/lib/server';
import { connectToRabbitAndCreateChannel } from '@minex/lib/amqp';
import { AMQP_SERVER, QUEUES } from '@minex/lib/config';
import { Channel } from 'amqplib';

const app = createExpressApp();

let channel: Channel;

let orderId = 1;

app.post('/order', (req, res) => {
  try {
    const order = req.body;

    channel.sendToQueue(
      QUEUES.ORDERS,
      Buffer.from(JSON.stringify({ ...order, orderId, date: Date.now() }))
    );

    orderId++;

    res.json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error:
        error instanceof Error
          ? error.message
          : error || 'Something went Wrong',
    });
  }
});

connectToRabbitAndCreateChannel(AMQP_SERVER).then(async (res) => {
  ({ channel } = res);
  await channel.assertQueue(QUEUES.ORDERS);
  startServer(app, Number(process.env.PORT) || 3001, 'Reception');
});
