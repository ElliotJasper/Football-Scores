const league = require("../leagues");
require("dotenv").config({
  path: __dirname + "/../.env",
});

console.log(__dirname);

console.log(process.env.PASSWORD);

const { MongoClient, ServerApiVersion } = require("mongodb");

const URI =
  "mongodb+srv://elliotadmin:" +
  process.env.PASSWORD +
  "@lastmanstanding.oqj3y.mongodb.net/?retryWrites=true&w=majority";

// Connect to MonogDB
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  if (err) throw err;
  let db = client.db("lastmanstanding-scores");
  db.collection("leagues").deleteMany({}, (err, result) => {
    if (err) throw err;
    db.collection("leagues").insertMany(league.allLeagues, (err, result) => {
      if (err) throw err;
      console.log("Document Updated");
      client.close();
    });
  });
});
