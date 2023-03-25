require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const connect = require("./db/connect");
const sessionauth = require("./utilities/sessionauth");
const footballRoute = require("./routes/football");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "session_id",
  })
);

app.use("/api/v1/football", footballRoute);

app.post("/api/v1/register", async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const result = await connect.db
      .collection("users")
      .findOne({ email: req.body.email });
    if (req.body.password.length < 6 || result) {
      return res.status(400).send();
    } else {
      const info = {
        email: req.body.email,
        password: password,
        key: sessionauth.createAPIKey(),
      };
      await connect.db.collection("users").insertOne(info);
      res.status(201).send();
    }
  } catch (err) {
    next(err);
  }
});

app.post("/api/v1/login", async (req, res, next) => {
  try {
    const result = await connect.db
      .collection("users")
      .findOne({ email: req.body.email });
    if (!result) {
      return res.status(401).send("Incorrect username or password");
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      result.password
    );
    if (!passwordMatch) {
      return res.status(401).send("Incorrect username or password");
    }
    req.session.email = req.body.email;
    res.status(200).send("Logged in");
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
