require("dotenv").config({
  path: __dirname + "/../.env",
});

console.log(process.env.PASSWORD);

const { MongoClient } = require("mongodb");
const games = require("../request");
const date = require("../getdate");

const URI = process.env.PASSWORD;

async function run() {
  const client = await MongoClient.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    if (!games.allGames || games.allGames.length === 0) {
      return;
    }

    const db = client.db("lastmanstanding-scores");
    const query = { date: date.formatDateAPI };

    const result = await db
      .collection("last-man-standing")
      .find(query)
      .toArray();

    if (result.length > 0) {
      await db.collection("last-man-standing").deleteMany(query);
      await db.collection("last-man-standing").insertMany(games.allGames);
      console.log("Document Updated");
    } else {
      await db.collection("last-man-standing").insertMany(games.allGames);
      console.log("Document Inserted");
    }
  } finally {
    client.close();
  }
}

run().catch((err) => console.error(err));
