import { ReactComponent as Tick } from "../assets/tick.svg";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Price = () => {
  const [customerId, setCustomerId] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies([
    "cliSecret",
    "subId",
    "price",
  ]);
  const [prices, setPrices] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState(null);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const checkSubscribed = (e) => {
    const isSubscribed = localStorage.getItem("isSubscribed");
    if (isSubscribed == "true") {
      alert("You are already subscribed");
      e.preventDefault();
    }
  };

  useEffect(() => {
    setCustomerId(getCookie("customerId"));

    const fetchPrices = async () => {
      const { prices } = await fetch("/config").then((r) => r.json());
      setPrices(prices);
    };
    fetchPrices();
  }, []);

  return (
    <div id="main-price-container">
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
              <form action="/create-checkout-session" method="POST">
                <input
                  type="hidden"
                  name="lookup_key"
                  value={price.lookup_key}
                />
                <input
                  type="hidden"
                  name="requests"
                  value={price.product.metadata.request}
                />
                <input
                  type="hidden"
                  name="ips"
                  value={price.product.metadata.ip}
                />
                <input type="hidden" name="customerId" value={customerId} />
                <button type="submit" onClick={checkSubscribed} class="pay-btn">
                  Choose Plan
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Price;
