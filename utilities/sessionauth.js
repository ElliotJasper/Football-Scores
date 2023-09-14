const connect = require("../db/connect");
const users = connect.db.collection("users");
const crypto = require("crypto");

// Creates user API keys

module.exports.createAPIKey = createAPIKey = () => {
  let id = crypto.randomBytes(20).toString("hex");
  return id;
};

// Check API Key on subsequen requests.
module.exports.authKey = authKey = async (req, res, next) => {
  let findKey = await users.findOne({ key: req.headers["authorization"] });
  if (findKey && findKey.activeSubscription) {
    next();
  } else {
    return res.status(401).send("error");
  }
};
