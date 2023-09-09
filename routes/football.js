const express = require("express");
const router = express.Router();
const connect = require("../db/connect");
const sessionauth = require("../utilities/sessionauth");

const lastManCollection = connect.db.collection("last-man-standing");
const leaguesCollection = connect.db.collection("leagues");

// Routes for all scores in db

router.get("/all", async (req, res) => {
  getData = await lastManCollection.find({}).toArray();
  return res.json(getData);
});

// Get games depending on query, can be any query in DB
router.get("/", sessionauth.authKey, async (req, res) => {
  const options = {};
  for (let [key, value] of Object.entries(req.query)) {
    options[key] = value;
  }
  console.log(options);

  if (req.query) {
    getData = await lastManCollection.find(options).toArray();
    if (getData.length > 0) {
      return res.json(getData);
    } else {
      return res.json("No data or invalid queries").send();
    }
  }
});

// Test route
router.get("/test", async (req, res) => {
  getData = await leaguesCollection
    .find({ leagueName: "Premier League Table" })
    .toArray();
  let gamesToSend = [];
  for (let i = 0; i < 6; i++) {
    gamesToSend.push(getData[0].table[i]);
  }
  return res.json(gamesToSend);
});

// These routes are used on the front end to display part of a league
router.get("/eng", async (req, res) => {
  getData = await leaguesCollection
    .find({ leagueName: "Premier League Table" })
    .toArray();
  let gamesToSend = [];
  for (let i = 0; i < 10; i++) {
    gamesToSend.push(getData[0].table[i]);
  }
  return res.json(gamesToSend);
});

router.get("/ger", async (req, res) => {
  getData = await leaguesCollection
    .find({ leagueName: "German Bundesliga Table" })
    .toArray();
  let gamesToSend = [];
  for (let i = 0; i < 10; i++) {
    gamesToSend.push(getData[0].table[i]);
  }
  return res.json(gamesToSend);
});

router.get("/esp", async (req, res) => {
  getData = await leaguesCollection
    .find({ leagueName: "Spanish La Liga Table" })
    .toArray();
  let gamesToSend = [];
  for (let i = 0; i < 10; i++) {
    gamesToSend.push(getData[0].table[i]);
  }
  return res.json(gamesToSend);
});

module.exports = router;
