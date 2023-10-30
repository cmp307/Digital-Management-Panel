import * as mongoDB from "mongodb";

export const collections: {
    connection?: mongoDB.MongoClient,
    assets?: mongoDB.Collection,
    employees?: mongoDB.Collection
} = {}


export async function getConnection() {
    if (collections.connection) return collections.connection;

    const client: mongoDB.MongoClient = new mongoDB.MongoClient('mongodb+srv://uni-project:9rT5qBAsDfGQgGOg@cluster0.vz4azvs.mongodb.net/?retryWrites=true&w=majority');

    const db: mongoDB.Db = client.db('uni-project');
    const assetCollection: mongoDB.Collection = db.collection('assets');
    const employeeCollection: mongoDB.Collection = db.collection('employees');

    collections.connection = db;
    collections.assets = assetCollection;
    collections.employees = employeeCollection;

    console.log(`Successfully connected to database: ${db.databaseName}`);
    return db;
}


export async function getAssetsFromDatabase() {
    try {
        const conn = await getConnection();
        const res = await conn.assets.find({}).toArray();
        console.log(res);
        return res as any[];
    } catch (error) {
        console.error(error);
        return [];
    }
}