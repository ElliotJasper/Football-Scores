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
  let options = {};
  for (let [key, value] of Object.entries(req.query)) {
    options[key] = value;
  }
  // If user adds start date or end date queries, need to ammend date to incorporate these
  // Use spread operator to not change what is already in date
  // startDate and endDate take priority over date so if date query also exists, delete it
  if ("startDate" in options || "endDate" in options) {
    delete options.date;
  }
  if ("startDate" in options) {
    options.date = { ...options.date, $gte: options["startDate"] };
    delete options.startDate;
  }
  if ("endDate" in options) {
    options.date = { ...options.date, $lt: options["endDate"] };
    delete options.endDate;
  }

  console.log(options);

  if (Object.keys(req.query) == 0) {
    return res.status(400).send("No data or invalid queries");
  }

  if (Object.keys(req.query).length > 0) {
    getData = await lastManCollection
      .find(options, { projection: { _id: 0 } }) // So id not visible
      .toArray();
    if (getData.length > 0) {
      return res.json(getData);
    } else {
      return res.status(400).send("No data or invalid queries");
    }
  }
});

// Test route used on frontend
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
