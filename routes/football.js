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
router.get("/", async (req, res) => {
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

router.get("/leagues", async (req, res) => {
  getData = await leaguesCollection
    .find({ leagueName: "League One Table" })
    .toArray();
  return res.json(getData[0].table);
});

module.exports = router;
