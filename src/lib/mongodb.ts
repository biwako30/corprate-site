import { MongoClient } from 'mongodb';

// MongoDB接続用の型定義
export interface ConnectResult {
  client: MongoClient;
  db: any;
}

// MongoDB接続関数
export async function connect(): Promise<ConnectResult> {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('dbtest');
  return { client, db };
}