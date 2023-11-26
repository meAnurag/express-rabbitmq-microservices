import { createExpressApp, startServer } from '@minex/lib/server';
import { connectToRabbitAndCreateChannel } from '@minex/lib/amqp';
import { AMQP_SERVER, QUEUES } from '@minex/lib/config';
import { Channel, ConsumeMessage } from 'amqplib';

const app = createExpressApp();

let channel: Channel;

const processOrder = (data: ConsumeMessage) => {
  console.log(
    'Order received: ',
    data && data.content
      ? JSON.parse(Buffer.from(data.content).toString())
      : null
  );
  channel.ack(data);
};

app.all('*', (req, res) => {
  res.status(404).json({ message: "Don't do it!" });
});

connectToRabbitAndCreateChannel(AMQP_SERVER).then(async (res) => {
  ({ channel } = res);
  await channel.consume(QUEUES.ORDERS, processOrder);
  startServer(app, Number(process.env.PORT) || 3002, 'Kitchen');
});
