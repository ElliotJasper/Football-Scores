import { ReactComponent as Tick } from "../assets/tick.svg";

const Price = () => {
  return (
    <div className="main-price-container">
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
              1000 requests per day
            </p>
            <p>
              <Tick />2 separate IPs
            </p>
          </div>
          <form action="/create-checkout-session" method="POST">
            <input type="hidden" name="lookup_key" value="freelance" />
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
              5,000 requests per day
            </p>
            <p>
              <Tick />
              10 separate IPs
            </p>
          </div>
          <form action="/create-checkout-session" method="POST">
            <input type="hidden" name="lookup_key" value="professional" />
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
              10,000 requests per day
            </p>
            <p>
              <Tick />
              25 separate IPs
            </p>
          </div>
          <form action="/create-checkout-session" method="POST">
            <input type="hidden" name="lookup_key" value="plus" />
            <button type="submit">Choose plan</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Price;
