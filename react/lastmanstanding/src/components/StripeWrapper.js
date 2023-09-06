import { Elements, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Subscribe from "./Subscribe";
const stripePromise = loadStripe(
  "pk_test_51Mw2g0A1ZXnUyhSXbKjKAQMXKZQgO6vqDvRPfuZR9nO9MdaXMi6oe9Si2Oh7H87bOHA2hi8SHXaFNLTxFzTXkRvi00KiJCxkwN"
);

const StripeWrapper = () => {
  const [subId, setSubId] = useState();
  const [clientSecret, setCliSecret] = useState();
  const [loading, setLoading] = useState(true); // Added loading state

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    setSubId(getCookie("subId"));
    setCliSecret(getCookie("cliSecret"));
    setLoading(false); // Set loading to false once the clientSecret is fetched
    console.log("hello");
  }, []);

  return (
    !loading && (
      <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
        <Subscribe />
      </Elements>
    )
  );
};

export default StripeWrapper;
