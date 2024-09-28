import React, { useEffect } from "react";

function PaymentPage() {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", "pl_OIAeqLttDpRvFQ");
    script.async = true;

    // Append the script to the form element
    const form = document.getElementById("payment-form");
    form.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      form.removeChild(script);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div>
        <div>
          <form id="payment-form">
            <h1>Hello</h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
