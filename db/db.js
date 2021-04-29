const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://localhost:27017/";
const client = new MongoClient(uri);

module.exports = new Promise((resolve, reject) => {
  client.connect().then((client) => {
    client.db("carbay").then((db) => {
      resolve(db);
    }).catch((err) => client.close());
  }).catch(() => client.close());
});
