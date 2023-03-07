// ERROR IN STOREGAMES AND TEAMS WHERE TRIES TO ADD NOTHING TO DB IF NO GAMES ON

// session used on login, api key used on api requests for scores
// if no session redirect to the login page
// if logged in, redirect from login page to dashboard / homepage.
const sessionauth = require("./utilities/sessionauth");
const connect = require("./db/connect");
const bcrypt = require("bcrypt");
const express = require("express");
const session = require("express-session");
const app = express();

app.use(express.json());

const lastManCollection = connect.db.collection("last-man-standing");
const users = connect.db.collection("users");

app.use(
  session({
    secret: "secret",
    name: "session_id",
    saveUninitialized: false,
    resave: false,
  })
);

// Allow users to register
app.post("/api/v1/register", async (req, res) => {
  let password = await bcrypt.hash(req.body.password, 10);
  // Check if email already exists, and that password is 6 chars minimum
  users.find({ email: req.body.email }).toArray((err, result) => {
    if (err) throw err;
    console.log(result.length);
    if (req.body.password.length < 6 || result.length > 0) {
      return res.status(400).send();
    } else {
      try {
        let info = {
          email: req.body.email,
          password: password,
          key: sessionauth.createAPIKey(),
        };
        users.insertOne(info, (err) => {
          if (err) {
            console.log(error);
            return res.status(500).send();
          }
        });
        res.status(201).send();
      } catch (err) {
        console.log(err);
        return res.status(500).send();
      }
    }
  });
});

app.post("/api/v1/login", async (req, res) => {
  // Find the username in DB
  // Compare the passwords
  users.find({ email: req.body.email }).toArray((err, result) => {
    if (err) {
      return res.status(500).send();
    }
    if (result.length == 1) {
      // If username found
      bcrypt.compare(req.body.password, result[0].password, (err, result) => {
        if (err) return console.log(err);
        if (result) {
          // give session stuff
          //************************
          req.session.email = req.body.email;
          console.log(req.session.id);
          console.log(req.cookies);
          res.status(201).send("Logged in");
        } else {
          res.status(401).send("Incorrect username or password");
        }
      });
    } else {
      // Username not found
      return res.status(401).send("Incorrect username or password");
    }
  });
});

// Get everything from database
app.get("/api/v1/info", sessionauth.authKey, async (req, res) => {
  getData = await lastManCollection.find({}).toArray();

  return res.json(getData).send();
});

// Get all games depending on home team
app.get(
  "/api/v1/info/homename/:homeName",
  sessionauth.authKey,
  async (req, res) => {
    const homeName = req.params.homeName;
    getData = await lastManCollection.find({ homeName: homeName }).toArray();
    return res.json(getData).send();
  }
);

// Get all games depending on away team
app.get("/api/v1/info/awayname/:awayName", async (req, res) => {
  const awayName = req.params.awayName;
  getData = await lastManCollection.find({ awayName: awayName }).toArray();
  return res.json(getData).send();
});

// Get all games on a particular date
app.get("/api/v1/info/date/:date", async (req, res) => {
  const date = req.params.date;
  getData = await lastManCollection.find({ date: date }).toArray();
  return res.json(getData).send();
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
