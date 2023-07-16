import { redirect, Link, Navigate, useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../assets/arrow-right.svg";
import { ReactComponent as Search } from "../assets/search.svg";

const navbar = () => {
  let navigate = useNavigate();
  const toRedirect = () => {
    navigate("/login");
  };

  const pricingScroll = () => {};

  return (
    <div className="nav-container">
      <div className="nav-links">
        <div className="nav-logo">scoreit</div>
        <ul className="nav-list">
          <li className="hoverable">Tables</li>
          <li className="hoverable">Scores</li>
          <li className="hoverable">
            <a href="#main-price-container">Pricing</a>
          </li>
          <li className="hoverable">Docs</li>
        </ul>
        <div className="nav-search-text">
          <div className="search-svg">
            <Search />
          </div>
          Documentation Search
        </div>
      </div>

      <div className="nav-sign-in" onClick={toRedirect}>
        <div className="sign-in-text hoverable">Sign in</div>

        <div className="svg-container">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default navbar;
