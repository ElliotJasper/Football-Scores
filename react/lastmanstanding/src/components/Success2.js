import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Tick } from "../assets/check-circle.svg";
import { ReactComponent as Clock } from "../assets/clock.svg";
import { ReactComponent as SmallTick } from "../assets/tick-small.svg";
const Success2 = () => {
  let navigate = useNavigate();
  const toRedirect = () => {
    navigate("/");
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  let price = getCookie("price");
  let requests = getCookie("requests");
  let ips = getCookie("ips");

  useEffect(() => {
    console.log(getCookie("price"));
  }, []);

  console.log(price);

  return (
    <div className="success-two-container">
      <div className="success-two-main">
        <div className="success-top-confirm">Order Confirmation</div>
        <div className="success-main">
          <div className="success-main-left">
            <Tick />
            <div className="order-confirmed">Order Confirmed!</div>
            <div className="order-token-info">
              Your token will get to you soon
            </div>
            <div className="view-invoice">View Invoice</div>
            <div className="go-home" onClick={toRedirect}>
              Go Back Home
            </div>
          </div>
          <div className="success-main-right">
            <div className="success-top-right">
              <div className="delivery-info">
                <Clock />
                <p className="time-accessible">Immediate Access</p>
              </div>
              <div className="product-title">Football Scores API</div>
              <div className="product-info">Includes: </div>
              <div className="includes-list">
                <div className="includes-one">
                  <SmallTick />
                  <p>{requests} requests per day</p>
                </div>
                <div className="includes-one">
                  <SmallTick />
                  <p>{ips} separate IP addresses</p>
                </div>
                <div className="includes-one">
                  <SmallTick />
                  <p>Access to 1000s of games</p>
                </div>
              </div>
            </div>
            <div className="success-bottom-right">
              <div className="price-info-top">
                <div className="quantity">x1</div>
                <div className="price-per">${price} per month</div>
              </div>
              <div className="bottom-right-row1 flex-row">
                <div className="subtotal">Subtotal</div>
                <div className="subtotal-val">${price}</div>
              </div>
              <div className="bottom-right-row2 flex-row">
                <div className="processing-fee">Processing Fee</div>
                <div className="processing-fee-val">$0</div>
              </div>
              <div className="bottom-right-row3 flex-row">
                <div className="total">Total</div>
                <div className="total-val">${price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success2;
