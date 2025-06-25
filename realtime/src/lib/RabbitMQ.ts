import {
  type AMQPChannel,
  AMQPClient,
  type AMQPMessage,
} from "@cloudamqp/amqp-client";
import type { Rabbit } from "../types/rabbit";

export default class RabbitMQ {
  private static instance: RabbitMQ | null = null;
  private url: string;
  private connection: AMQPClient | null = null;
  private channel: AMQPChannel | null = null;
  private isConnected = false;

  private constructor(url: string) {
    this.url = url;
  }

  static getInstance(url: string) {
    if (!RabbitMQ.instance) {
      RabbitMQ.instance = new RabbitMQ(url);
    }
    return RabbitMQ.instance;
  }

  async connectIfNotConnected() {
    if (this.isConnected) return;

    try {
      this.connection = new AMQPClient(this.url);
      const connection = await this.connection.connect();
      this.channel = await connection.channel();
      this.isConnected = true;
    } catch (error) {
      console.error("❌ Erreur de connexion à RabbitMQ :", error);
      throw error;
    }
  }

  async sendMessage<
    K extends keyof Rabbit.SendMessage,
    V extends Rabbit.SendMessage[K],
  >(message: V, queueName: K) {
    try {
      this.connectIfNotConnected();
      assertsChannelInitialized(this.channel);
      const queue = await this.channel.queue(queueName);
      await queue.publish(JSON.stringify(message), { deliveryMode: 1 });
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi du message :", error);
      throw error;
    }
  }

  async ensureQueue(queueName: string) {
    try {
      this.connectIfNotConnected();
      assertsChannelInitialized(this.channel);
      await this.channel.queue(queueName, { durable: true });
    } catch (error) {
      console.error(
        `❌ Erreur lors de la création ou vérification de la queue '${queueName}':`,
        error,
      );
      throw error;
    }
  }

  async consume<K extends keyof Rabbit.Consume, V extends Rabbit.Consume[K]>(
    queueName: K,
    handler: (message: V) => Promise<void>,
  ) {
    try {
      await this.connectIfNotConnected();
      assertsChannelInitialized(this.channel);

      const queue = await this.channel.queue(queueName);
      const consumer = await queue.subscribe(
        { noAck: false },
        async (msg: AMQPMessage) => {
          const msgBody = msg.bodyToString();
          if (!msgBody) throw new Error("Un message vide a été reçu");

          await handler(JSON.parse(msgBody));
          await msg.ack();
        },
      );
      return consumer;
    } catch (error) {
      `❌ Erreur lors de la consommation de la queue ${queueName} : ${error}`;
      throw error;
    }
  }

  async close() {
    try {
      if (this.channel) {
        await this.channel.close();
        this.channel = null;
      }
      if (this.connection) {
        await this.connection.close();
        this.connection = null;
      }
      this.isConnected = false;
      RabbitMQ.instance = null;
      console.info("🔌 Connexion RabbitMQ fermée.");
    } catch (error) {
      console.error("❌ Erreur lors de la fermeture de RabbitMQ :", error);
      throw error;
    }
  }
}

function assertsChannelInitialized(
  channel: AMQPChannel | null,
): asserts channel is AMQPChannel {
  if (!channel) {
    throw new Error(
      "Le canal RabbitMQ n'est pas initialisé. Appelez connectIfNotConnected() d'abord.",
    );
  }
}
