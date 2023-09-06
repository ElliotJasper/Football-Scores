import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sanitize } from "../utils/sanitize";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const sanitizedEmail = sanitize(email);
    const sanitizedPassword = sanitize(password);

    fetch("/api/v1/register", {
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
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
