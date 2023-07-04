require("dotenv").config({
  path: __dirname + "/../.env",
});

console.log(process.env.PASSWORD);

const { MongoClient, ServerApiVersion } = require("mongodb");
const games = require("../request");
const date = require("../getdate");
const { useSyncExternalStore } = require("react");

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
  if (!games.allGames) {
    client.close();
    return;
  }
  if (err) throw err;
  let db = client.db("lastmanstanding-scores");
  let query = { date: date.formatDateAPI };
  db.collection("last-man-standing").deleteMany({}, (err, result) => {
    if (err) throw err;
    client.close();
  });
});
