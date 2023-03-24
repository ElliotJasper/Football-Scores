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

async function updateLeagues() {
  try {
    await client.connect();
    const db = client.db("lastmanstanding-scores");
    await db.collection("leagues").deleteMany({});
    const result = await db.collection("leagues").insertMany(league.allLeagues);
    console.log("Document Updated");
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

updateLeagues();
