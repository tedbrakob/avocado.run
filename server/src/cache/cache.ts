import { createClient } from 'redis';
import { redis as config } from '../config/config';

const getClient = async () => {
  const client = createClient({
    socket: {
      host: config.host,
      port: config.port
    },
  });

  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  return client;
}

const set = async (key: string, value: string | number) => {
  const client = await getClient();
  const result = await client.set(key, value);
  await client.quit();
  return result;
};

const get = async (key: string) => {
  const client = await getClient();
  const result = await client.get(key);
  await client.quit();
  return result;
};

const hSet = async (key: string, field: string, value: string | number) => {
  const client = await getClient();
  const result = await client.hSet(key, field, value);
  await client.quit();
  return result;
};

const hGet = async (key: string, field: string) => {
  const client = await getClient();
  const result = await client.hGet(key, field);
  await client.quit();
  return result;
};

export default {
  getClient,
  set,
  get,
  hSet,
  hGet,
}