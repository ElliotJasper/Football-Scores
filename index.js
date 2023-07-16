require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const connect = require("./db/connect");
const sessionauth = require("./utilities/sessionauth");
const footballRoute = require("./routes/football");
const body_parser = require("body-parser");

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "session_id",
  })
);

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/create-checkout-session", async (req, res) => {
  res.cookie("num-req", req.body["requests"]);
  res.cookie("num-ip", req.body["ips"]);
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ["data.product"],
  });
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${YOUR_DOMAIN}/confirm/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/failure?canceled=true`,
  });
  let itemPrice = prices.data[0].unit_amount / 100;
  res.cookie("price", itemPrice);
  res.redirect(303, session.url);
});

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

app.get("/api/v1/checkauth", async (req, res, next) => {
  if (req.session.email) {
    res.status(200).send();
  } else {
    res.status(401).send();
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
