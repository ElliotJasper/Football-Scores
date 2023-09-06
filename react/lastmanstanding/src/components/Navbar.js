import { Link, Navigate, useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../assets/arrow-right.svg";
import { ReactComponent as Search } from "../assets/search.svg";

const navbar = () => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const loggedInUser = getCookie("logged_in") || false;

  let navigate = useNavigate();
  const toLogin = () => {
    navigate("/login");
  };
  const toRegister = () => {
    navigate("/register");
  };

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

      <div className="nav-sign-in">
        {loggedInUser == false ? (
          <div className="sign-in-text hoverable">
            <Link to={"/login"}>Sign In</Link>
          </div>
        ) : (
          <div className="sign-in-text hoverable">Sign Out</div>
        )}

        <div className="svg-container">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default navbar;
