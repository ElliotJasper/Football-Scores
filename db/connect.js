// Connect to Database
require("dotenv").config({
  path: __dirname + "/../.env",
});
console.log(process.env.PASSWORD);
const { MongoClient, ServerApiVersion, Db } = require("mongodb");
const URI =
  "mongodb+srv://elliotadmin:" +
  process.env.PASSWORD +
  "@lastmanstanding.oqj3y.mongodb.net/lastmanstanding-scores?retryWrites=true&w=majority";
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports.db = client.db();
//const lastManCollection = db.collection("last-man-standing");
//const users = db.collection("users");
