import { MongoClient, ServerApiVersion } from 'mongodb';

if(!process.env.MONGODB_URI){
  throw new Error("MongoDB URL not found")
}

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function getDatabase(bdName) {
  try {
    console.log("connecting...")
    await client.connect();
    console.log("Connected to DB...")
    return client.db(bdName)
  }catch(err){
    console.log("error",err)
  }}

  export async function getCollection(collectionName) {
    const db=await getDatabase('next_blog_app');
    if(db){
      return db.collection(collectionName);
    }
    return null;
  }