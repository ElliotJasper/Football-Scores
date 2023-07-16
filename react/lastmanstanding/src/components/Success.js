import { ReactComponent as Tick } from "../assets/check-circle.svg";
import { redirect, Link, Navigate, useNavigate } from "react-router-dom";

const Success = () => {
  let navigate = useNavigate();
  const toRedirect = () => {
    navigate("/");
  };
  return (
    <div className="success-container">
      <div className="payment-success">Payment Success!</div>
      <Tick id="tick" />
      <div className="payment-info">
        Your purchase was successful. <br /> For more details, please check your
        email.
      </div>
      <div className="back-home" onClick={toRedirect}>
        Go home
      </div>
    </div>
  );
};

export default Success;
