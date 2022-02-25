import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
const ordersAndPaymentData = [
  {
    question: "What are the payment methods?",
    answer: (
      <>
        <h5>
          {" "}
          eSewa wallet transfer{" "}
          <img src="images/esewapng.png" alt="" height="30px" />
        </h5>
        <div className="pay__method__explanation">
          eSewa: at <strong>9804355969</strong> <br /> (enter this in the eSewa
          id when you're to send the amount) to activate your order.
          <br />
          enter this to your remarks:{" "}
          <strong> Proudposhak order from orderid: yourOrderId </strong>
        </div>
        <br />

        <h5>
          khalti money transfer
          <img src="images/Khalti_logo.png" alt="" height="30px" />
        </h5>
        <div className="pay__method__explanation">
          Khalti: at <strong>9804355969</strong> <br /> (enter this in the
          khalti id when you're to send the amount) to activate your order.
          <br />
          enter this to your remarks:{" "}
          <strong> Proudposhak order from orderid: yourOrderId </strong>
        </div>
        <br />
        <h5>
          Bank Transfer: Rastra Banijya bank{" "}
          <AccountBalanceIcon></AccountBalanceIcon>
        </h5>
        <div className="pay__method__explanation">
          Bank Name: Rastriya Banijya Bank Ltd. <br />
          Branch Office: Duhabi <br />
          A/C No.: <strong> 2340100002738010</strong> <br /> Account Holder:
          Aman Chaudhary
        </div>
        <br />

        <h5>cash on delivery</h5>
        <div className="pay__method__explanation">
          Pay cash when the order is delivered at your location
        </div>
      </>
    ),
  },
];
const shippingAndDelivery = [
  {
    question: "Where do we deliver?",
    answer: (
      <div>
        Biratnagar <br /> Duhabi
        <br /> Itahari
        <br /> Inaruwa
        <br /> Jhumka
        <br /> Chitwan
        <br /> Kathmandu
        <br />
        Saptari
        <br /> Siraha
      </div>
    ),
  },
  {
    question: "What is the delivery time?",
    answer: "Within 2 weeks",
  },
  {
    question: "Delivery Charge",
    answer: (
      <div>
        <div> Free delivery all over Nepal</div>
      </div>
    ),
  },
];

export { ordersAndPaymentData, shippingAndDelivery };
