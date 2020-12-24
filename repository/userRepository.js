const {collections, getCollection} = require('../connection/mongodb')

const collection = getCollection(collections.user)

const saveUser =(user) =>{
    return (await collection).insertOne(user)
}


module.exports  = {
    saveUser
}