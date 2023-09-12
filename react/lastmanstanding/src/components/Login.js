import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sanitize } from "../utils/sanitize";
import { Link } from "react-router-dom";
import { ReactComponent as User } from "../assets/user-circle.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const sanitizedEmail = sanitize(email);
    const sanitizedPassword = sanitize(password);

    fetch("/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: sanitizedEmail,
        password: sanitizedPassword,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          navigate("/"); // Redirect to home page
        } else {
          throw new Error("Invalid email or password");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <form onSubmit={handleLogin}>
          <User />
          <div className="login-main-text">Already a member?</div>
          <div className="sign-in-text">Sign into your account</div>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="register-container"></div>
          <button type="submit" id="sign-in-btn">
            Sign In
          </button>
          <Link to={"/register"}>
            <div className="register-link">Register an account</div>
          </Link>
          <button className="google-connect">Connect With Google</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
