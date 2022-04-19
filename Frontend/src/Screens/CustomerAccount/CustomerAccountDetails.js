import React from "react";
import { useSelector } from "react-redux";

function CustomerAccountDetails() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { customerId, firstName, secondName } = userInfo && userInfo[0];
  return (
    <div className="customer__account__details">
      <div>Email: {customerId}</div>
      <div>Name: {firstName + " " + secondName}</div>
    </div>
  );
}
export default CustomerAccountDetails;
