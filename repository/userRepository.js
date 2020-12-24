const {collections, getCollection} = require('../connection/mongodb')

const collection = getCollection(collections.user)

const saveUser = async (user) =>{
    return (await collection).insertOne(user)
}

const updateUser = async (id, user) =>{
    const userId = new ObjectId(id); 
    return (await collection).updateOne(
        { _id: userId },
        { $set: { user } },
      );
}

const getUsers = async () =>{
    return (await collection).find({}).toArray()
}


module.exports  = {
    saveUser, 
    updateUser, 
    getUsers
}