import { ReactComponent as Cross } from "../assets/delete-circle.svg";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  let navigate = useNavigate();
  const toRedirect = () => {
    navigate("/");
  };
  return (
    <div className="failure-container">
      <div className="payment-fail">Payment Failed</div>
      <Cross id="cross" />
      <div className="decline-info">
        Unfortunately your payment has failed. <br /> You have not been charged.
      </div>
      <div className="back-home" onClick={toRedirect}>
        Go home
      </div>
    </div>
  );
};

export default Failure;
