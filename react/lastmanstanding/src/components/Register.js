import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sanitize } from "../utils/sanitize";
import { ReactComponent as User } from "../assets/user-circle.svg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const sanitizedEmail = sanitize(email);
    const sanitizedPassword = sanitize(password);
    const sanitizedPasswordConfirm = sanitize(passwordConfirm);

    console.log(sanitizedPassword);
    console.log(sanitizedPasswordConfirm);

    if (
      sanitizedPassword != sanitizedPasswordConfirm ||
      sanitizedEmail.length == 0
    ) {
      return;
    }

    fetch("/api/v1/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: sanitizedEmail,
        password: sanitizedPassword,
        passwordConfirm: sanitizedPasswordConfirm,
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
        <form onSubmit={handleRegister}>
          <User />
          <div className="login-main-text">Register your account</div>
          <div className="sign-in-text">Enter your details</div>
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
          <input
            type="password"
            placeholder="re-enter password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button type="submit" id="register-btn">
            Register
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
