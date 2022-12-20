import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['settling-sturgeon-8283-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'c2V0dGxpbmctc3R1cmdlb24tODI4MyQvf5U9UsxUdgHWGwEQfKN8IijIeBuLoDk',
      password:
        'TgyIwfaDAu8J9SwpWjtAsInnUCsrgY_zPduA103Hwn6ay7FBHFjQ5YD_T1wNv7lzkxQQwg==',
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
