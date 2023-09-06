import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full name
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export default CheckoutForm;
