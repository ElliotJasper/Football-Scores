import { ReactComponent as Tick } from "../assets/tick.svg";

const Price = () => {
  return (
    <div className="prices-container">
      <div className="personal">
        <h4>Freelance</h4>
        <p className="tag">For small projects and personal use</p>
        <h1>$5</h1>
        <p className="time-frame">Per month</p>

        <p className="included">Included with this package:</p>
        <div className="features">
          <p>
            <Tick />
            1000 requests per day
          </p>
          <p>
            <Tick />
            Connect from anywhere
          </p>
          <p>
            <Tick />
            Passive income
          </p>
        </div>
        <button>Choose plan</button>
      </div>
    </div>
  );
};

export default Price;
