import { ReactComponent as Tick } from "../assets/tick.svg";

const Price = () => {
  return (
    <div id="main-price-container">
      <div className="price-title-container">
        <div className="price-title">Our Price Guarantee</div>
        <p>Choose a plan tailored to your needs</p>
      </div>
      <div className="prices-container">
        <div className="personal">
          <h4>Freelance</h4>
          <p className="tag">For your smaller projects</p>
          <h1>$5</h1>
          <p className="time-frame">Per month</p>

          <p className="included">Included with this package:</p>
          <div className="features">
            <p>
              <Tick />
              500 requests per day
            </p>
            <p>
              <Tick />2 separate IPs
            </p>
          </div>
          <form action="/create-checkout-session" method="POST">
            <input type="hidden" name="lookup_key" value="freelance" />
            <input type="hidden" name="requests" value="500" />
            <input type="hidden" name="ips" value="2" />
            <button type="submit">Choose plan</button>
          </form>
        </div>
        <div className="personal">
          <h4>Professional</h4>
          <p className="tag">For larger projects and business</p>
          <h1>$15</h1>
          <p className="time-frame">Per month</p>
          <p className="included">Included with this package:</p>
          <div className="features">
            <p>
              <Tick />
              1000 requests per day
            </p>
            <p>
              <Tick />
              10 separate IPs
            </p>
          </div>
          <form action="/create-checkout-session" method="POST">
            <input type="hidden" name="lookup_key" value="professional" />
            <input type="hidden" name="requests" value="1000" />
            <input type="hidden" name="ips" value="10" />
            <button type="submit">Choose plan</button>
          </form>
        </div>
        <div className="personal">
          <h4>Plus</h4>
          <p className="tag">For large projects and business</p>
          <h1>$30</h1>
          <p className="time-frame">Per month</p>

          <p className="included">Included with this package:</p>
          <div className="features">
            <p>
              <Tick />
              2000 requests per day
            </p>
            <p>
              <Tick />
              25 separate IPs
            </p>
          </div>
          <form action="/create-checkout-session" method="POST">
            <input type="hidden" name="lookup_key" value="plus" />
            <input type="hidden" name="requests" value="2000" />
            <input type="hidden" name="ips" value="25" />
            <button type="submit">Choose plan</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Price;
