import { ReactComponent as Tick } from "../assets/tick.svg";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Price = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cliSecret", "subId"]);
  const [prices, setPrices] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrices = async () => {
      const { prices } = await fetch("/config").then((r) => r.json());
      setPrices(prices);
    };

    fetchPrices();
  }, []);

  const createSubscription = async (priceId) => {
    try {
      const response = await fetch("/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const { subscriptionId, clientSecret } = await response.json();
      setCookie("cliSecret", clientSecret, { path: "/" });
      setCookie("subId", subscriptionId, { path: "/" });
      console.log(subscriptionId, "000000");
      console.log(clientSecret, "000000");
      navigate("/subscribe"); // Redirect after receiving the response
    } catch (error) {
      console.error("Error creating subscription:", error);
      // Handle the error appropriately, e.g., show an error message to the user.
    }
  };

  return (
    <div className="main-price-container">
      <div className="price-title-container">
        <div className="price-title">Our Price Guarantee</div>
        <p>Choose a plan tailored to your needs</p>
      </div>
      <div className="prices-container">
        {prices.map((price) => {
          return (
            <div key={price.id} className="personal">
              <h4>{price.product.name}</h4>
              <h1>${price.unit_amount / 100}</h1>
              <p className="time-frame">Per month</p>
              <p className="included">Included with this package:</p>
              <div className="features">
                <p>
                  <Tick />
                  {price.product.metadata.request}
                </p>
                <p>
                  <Tick />
                  {price.product.metadata.ip}
                </p>
              </div>
              <button
                className="plan-btn"
                onClick={() => createSubscription(price.id)}
              >
                Choose Plan
              </button>
              {/* NEEDS AN ONCLICK TO CALL CREATE SUBSCRIPTION */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Price;
