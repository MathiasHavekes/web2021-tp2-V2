const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://Admin:carbay@cluster0.xavn5.mongodb.net/carbay";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

const connectToMongoDB = async () => {
  client.connect().then(() => {
    console.log("Connected to MongoDB");
  }).catch((err) => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1);
  })
}

const closeConnection = async () => {
  client.close()
  .then(() => {
    console.log("Connection closed");
  })
  .catch((err) => {
    console.log('Error closing connection', err);
  });
}

module.exports = {
  connectToMongoDB,
  closeConnection,
  client
};