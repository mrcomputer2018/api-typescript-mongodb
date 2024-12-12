import { MongoClient as Mongo, Db } from 'mongodb';

//metodos para se comunicar e se conectar com o banco de dados
export const MongoClient = {
    client: undefined as unknown as Mongo,
    db: undefined as unknown as Db,

    async connect(): Promise<void> {
        const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';
        const username = process.env.MONGODB_USERNAME;
        const password = process.env.MONGODB_PASSWORD;

        const client = new Mongo(url, {
            auth: { username, password },
        });

        const db = client.db('api-typescript-mongodb');

        this.client = client;
        this.db = db;

        console.log('connected to mongo');
    },
};
