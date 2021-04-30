const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://Admin:carbay@cluster0.xavn5.mongodb.net/carbay";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let connection = {};

connection.connectToMongoDB = async function() {
  return client.connect()
  .then(function(client) {
    console.log("Connected to MongoDB");
    return client.db("carbay");
  }).catch(function(err) {
    console.log('Error during connection');
    throw err;
  });
}

connection.closeConnection = async function() {
  client.close()
  .then(function() {
    console.log("Connection closed");
  })
  .catch(function(err) {
    console.log('Error closing connection');
    throw err;
  });
}

module.exports = connection;