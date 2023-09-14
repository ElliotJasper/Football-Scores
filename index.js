// Require all packages
require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const connect = require("./db/connect");
const sessionauth = require("./utilities/sessionauth");
const footballRoute = require("./routes/football");
const stripeRoute = require("./routes/stripe");
const body_parser = require("body-parser");
// Set up stripe and server

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
const PORT = process.env.PORT || 8000;
const DOMAIN = "http://localhost:3000";

app.use("/api/v1/stripe", stripeRoute);

// Parsers
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    name: "session_id",
    store: MongoStore.create({
      mongoUrl: process.env.PASSWORD,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    },
  })
);

// Sends all prices and product info to front end for display
app.get("/config", async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: ["freelance", "professional", "plus"],
    expand: ["data.product"],
  });

  res.send({
    publishableKey: process.env.STRIPE_PUBLIC_KEY,
    prices: prices.data,
  });
});

// Uses stripes premade checkout session
app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body.customerId);
  console.log(req.session.email, " session");
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ["data.product"],
  });

  const requests = req.body.requests.split(" ")[0];
  const ips = req.body.ips.split(" ")[0];
  res.cookie("price", prices.data[0].unit_amount / 100);
  res.cookie("requests", requests);
  res.cookie("ips", ips);

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
    success_url: `${DOMAIN}/confirm`,
    cancel_url: `${DOMAIN}?canceled=true`,
    customer: req.body.customerId,
  });

  res.redirect(303, session.url);
});

app.post("/create-portal-session", async (req, res) => {
  const returnURL = DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: req.cookies.customerId,
    return_url: returnURL,
  });

  res.redirect(303, portalSession.url);
});

// Route to football file if appropriate
app.use("/api/v1/football", footballRoute);

// Allows users to register if email not already exist
app.post("/api/v1/register", async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    console.log(password);
    const result = await connect.db
      .collection("users")
      .findOne({ email: req.body.email });
    if (req.body.password.length < 6 || result) {
      return res.status(400).send();
    } else {
      const customer = await stripe.customers.create({
        email: req.body.email,
      });
      const info = {
        email: req.body.email,
        password: password,
        //key: sessionauth.createAPIKey(),
        custID: customer.id,
        activeSubscription: false,
      };
      await connect.db.collection("users").insertOne(info);
      console.log("user created");
      res.status(201).send();
    }
  } catch (err) {
    next(err);
  }
});

// Check user credentials when logging in
app.post("/api/v1/login", async (req, res, next) => {
  try {
    const result = await connect.db
      .collection("users")
      .findOne({ email: req.body.email });
    console.log(result);
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
    res.cookie("logged_in", true);
    res.cookie("email", req.body.email);
    res.cookie("customerId", result.custID);
    res.cookie("is_subscribed", result.activeSubscription);
    res.status(200).send({ customerId: result.custID });
  } catch (err) {
    next(err);
  }
});

// Send the API key to the frontend to give to user
// Other things sent in the future
app.post("/sub-info", async (req, res) => {
  let val = decodeURIComponent(req.body.email);
  const result = await connect.db.collection("users").findOne({ email: val });

  console.log(result.key);
  res.send(JSON.stringify(result.key));
});

app.get("/set-session", (req, res) => {
  res.sendStatus(200);
});

app.get("/show-session", (req, res) => {
  console.log(req.session.user);
  res.sendStatus(200);
});

// Middleware check for server errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
