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
const footballRoute = require("./routes/football.js");

app.use(express.json());

const lastManCollection = connect.db.collection("last-man-standing");
const users = connect.db.collection("users");

app.use(
  session({
    secret: "secret",
    name: "session_info",
    saveUninitialized: false,
    resave: false,
  })
);

app.get("/", (req, res) => {
  req.session.name = "elliot";
  console.log(req.session.id);
  res.send("hello");
});

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
app.use("/api/v1/football", footballRoute);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
