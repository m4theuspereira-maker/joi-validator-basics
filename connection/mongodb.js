const { Db, MongoClient } = require("mongodb");

/**
 * @type Db
 */
let dbInstance;

/**
 * @type MongoClient
 */
let mongoClient;

const connect = async () => {
  mongoClient = await MongoClient.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  dbInstance = mongoClient.db(process.env.DATABASE_NAME);

  return dbInstance;
};

const closeConnection = async () =>{
    if(mongoClient) mongoClient.close()
}

const getDb = async () =>{
    return dbInstance || (await connect())
}

const getCollection = async (collectionName) =>{
    return (await getDb()).collection(collectionName)
}

const collections = {
    user: 'user'
}

module.exports ={
    connect, 
    closeConnection, 
    getDb,
    getCollection, 
    collections
}