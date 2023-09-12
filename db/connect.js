// Connect to Database
require("dotenv").config({
  path: __dirname + "/../.env",
});
const { MongoClient, ServerApiVersion, Db } = require("mongodb");
const URI = process.env.PASSWORD;
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports.db = client.db();
//const lastManCollection = db.collection("last-man-standing");
//const users = db.collection("users");
