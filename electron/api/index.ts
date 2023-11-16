const mongo = require('mongodb');

const uri = 'mongodb+srv://uni-project:9rT5qBAsDfGQgGOg@cluster0.vz4azvs.mongodb.net/?retryWrites=true&w=majority';
const client = new mongo.MongoClient(uri);

let database: any;

export async function connectToMongoDB() {
  if (!database) {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      const _db = client.db('uni-project-dev');

      database = _db;
      return _db;
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  } else {
    console.log('Connected to running MongoDB conn')
    return database;
  }
}

export async function wrapper(_func:Function): Promise<any> {
    try {
        const db = await connectToMongoDB();
        await _func(db);
    } catch (error) {
        console.error('Database Error -> ', error)
    }
}