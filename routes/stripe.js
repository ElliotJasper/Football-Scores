const express = require("express");
const connect = require("../db/connect");
const router = express.Router();
const sessionauth = require("../utilities/sessionauth");
require("dotenv").config({
  path: __dirname + "/../.env",
});
console.log("######################");
console.log(process.env);
console.log("######################");

const stripe = require("stripe")(process.env.STRIPE_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

// Assuming you have already defined the usersCollection variable
const usersCollection = connect.db.collection("users");

// Webhook route that listens for stripe events
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event = req.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
      }
    }
    // If payment intent succeeded, create API key for user
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(
          `PaymentIntent for ${paymentIntent.amount} was successful!`
        );
        const APIKey = sessionauth.createAPIKey();
        let filter = { custID: paymentIntent.customer };
        const updateDoc = {
          $set: {
            activeSubscription: true,
            subscriptionLevel: paymentIntent.amount,
            key: APIKey,
          },
        };
        const result = await usersCollection.updateOne(filter, updateDoc);
        console.log(result);
        break;

      case "customer.subscription.deleted":
        // Revoke subscription
        const subscription = event.data.object;
        filter = { custID: subscription.customer };
        updateDoc = {
          $set: {
            activeSubscription: false,
            subscriptionLevel: 0,
          },
        };
        result = await usersCollection.updateOne(filter, updateDoc);
        console.log(result);
        console.log("Subscription was deleted");
        break; // Don't forget to add a break statement here

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
  }
);

module.exports = router;
