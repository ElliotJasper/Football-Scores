import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { withRouter } from "react-router-dom";
import {
  PaymentElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Mw2g0A1ZXnUyhSXbKjKAQMXKZQgO6vqDvRPfuZR9nO9MdaXMi6oe9Si2Oh7H87bOHA2hi8SHXaFNLTxFzTXkRvi00KiJCxkwN"
);

const Subscribe = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [subId, setSubId] = useState();
  const [cliSecret, setCliSecret] = useState();
  const [name, setName] = useState("");
  const [messages, _setMessages] = useState("");
  const [paymentIntent, setPaymentIntent] = useState();
  const [loading, setLoading] = useState(true); // Added loading state

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const subscriptionId = getCookie("subId");
    setSubId(subscriptionId);
    const clientSecret = getCookie("cliSecret");
    setCliSecret(clientSecret);
    setLoading(false); // Set loading to false once the clientSecret is fetched
    console.log(cliSecret);
  }, []);

  // helper for displaying status messages.
  const setMessage = (message) => {
    _setMessages(`${messages}\n\n${message}`);
  };

  const options = {
    clientSecret: cliSecret,
  };
  console.log(options);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentElement = elements.getElement(PaymentElement);

    // Check if clientSecret is defined before proceeding
    if (!cliSecret) {
      console.log("Client secret is not available yet.");
      return;
    }

    let { error, paymentMethod } = await stripe.confirmCardPayment(cliSecret, {
      payment_method: {
        card: paymentElement,
        billing_details: {
          name: name,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      return;
    }
    setPaymentIntent(paymentMethod);
  };

  if (paymentIntent && paymentIntent.status === "succeeded") {
    console.log("succeeded");
  }

  if (loading) {
    // You can render a loading indicator while fetching the clientSecret
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full name
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export default Subscribe;
