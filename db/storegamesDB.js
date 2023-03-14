require("dotenv").config({
  path: "C:/Users/ellio/Documents/lastmanstanding/.env",
});

console.log(process.env.PASSWORD);

const { MongoClient, ServerApiVersion } = require("mongodb");
const games = require("../request");
const date = require("../getdate");

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
  if (!games.allScores) {
    client.close();
    return;
  }
  if (err) throw err;
  let db = client.db("lastmanstanding-scores");
  let query = { date: date.formatDateAPI };

  // Insert or update documents depending if already exist
  db.collection("last-man-standing")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        db.collection("last-man-standing").deleteMany(query, (err, result) => {
          if (err) throw err;
          console.log("Document Deleted");
        });
        db.collection("last-man-standing").insertMany(
          games.allScores,
          (err, result) => {
            if (err) throw err;
            console.log("Document Updated");
            client.close();
          }
        );
      } else {
        db.collection("last-man-standing").insertMany(
          games.allScores,
          (err, result) => {
            if (err) throw err;
            console.log("Document Inserted");
            client.close();
          }
        );
      }
    });
});
