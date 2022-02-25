import React, { useState } from "react";
import HeaderSpacer from "../../components/HeaderSpacer";
import "../../Styles/customerAccount/customerAccount.css";
import CustomerAccountDetails from "./CustomerAccountDetails";
import CustomerOrders from "./CustomerOrders";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/customerActions";
function CustomerAccount() {
  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const theData = [{ title: "Orders" }, { title: "Account Details" }];
  useEffect(() => {
    if (userInfo === null) {
      navigate("/");
    } else {
    }
  }, [navigate, userInfo]);
  const theTabs = [
    { tab: <CustomerOrders></CustomerOrders> },
    { tab: <CustomerAccountDetails></CustomerAccountDetails> },
  ];

  // logout
  const userLogOut = () => {
    dispatch(logout());
    window.location.reload();
  };
  return (
    <div>
      <HeaderSpacer></HeaderSpacer>
      <div className="account__page__container">
        <div className="account__page__container__title">
          {userInfo && userInfo[0].firstName}'s Account,{" "}
          <span className="sign__out__text" onClick={userLogOut}>
            Sign Out
          </span>{" "}
        </div>
      </div>
      <div className="customer__account__tabs__container">
        {theData.map((obj, index, value) => {
          return (
            <CustomerAccountTabs
              index={index}
              theTitle={obj.title}
            ></CustomerAccountTabs>
          );
        })}
      </div>
      <div>{theTabs[value].tab}</div>
    </div>
  );

  function CustomerAccountTabs({ theTitle, index }) {
    return (
      <div
        className={`customer__account__tabs ${index === value && "active_btn"}`}
        onClick={() => {
          setValue(index);
        }}
      >
        <div className="customer__account__tabs__title">{theTitle}</div>
      </div>
    );
  }
}

export default CustomerAccount;
