import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/CheckOut/checkout.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input/input";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";

import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import HeaderSpacer from "../../components/HeaderSpacer";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../actions/cartActions";
import { clearProcessToOrder, createOrder } from "../../actions/orderActions";
import Loader from "../../components/Loader";
function CustomerCheckOutScreen({ history }) {
  let navigate = useNavigate();

  const [value, setValue] = useState(0);

  const changeValue = () => {
    setValue(value + 1);
  };

  const theLabelData = [
    { label: 1, text: "DETAILS" },
    { label: 2, text: "PAYMENT" },
    { label: 3, text: "PLACE ORDER" },
  ];

  const ourCheckOutTabs = [
    {
      theTab: <CCShipping value={changeValue}></CCShipping>,
    },
    {
      theTab: <CCPayment history={history} value={changeValue}></CCPayment>,
    },
    {
      theTab: <PlaceOrder history={history}></PlaceOrder>,
    },
  ];

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("cartItems" + cartItems);
  useEffect(() => {
    if (!userInfo || cartItems.length === 0) {
      navigate("/");
    } else {
    }
  }, [navigate, userInfo, cartItems]);
  return (
    <>
      <HeaderSpacer></HeaderSpacer>
      <div className="checkOut__product__page__container">
        <div className="unique__product__container__title">
          <div className="customer__name__checkout">
            {userInfo && userInfo[0].firstName} It's time to
          </div>
          CheckOut
        </div>
      </div>
      <div className="customer__checkout">
        <div className="customer__checkout__tabs">
          {theLabelData.map((obj, index) => (
            <div className="the__label" key={index.toString}>
              <div
                className={`the__number__label ${
                  index <= value && "the__active__tab"
                } `}
                onClick={() => {
                  if (index <= value) {
                    setValue(index);
                  }
                }}
              >
                {obj.label}
              </div>
              <div className="the__text__label">{obj.text}</div>
            </div>
          ))}
        </div>
        <div className="checkout-tab-content">
          {ourCheckOutTabs[value].theTab}
        </div>
      </div>
    </>
  );
}

export default CustomerCheckOutScreen;

export function CCPersonalDetails({ history, value }) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    if (firstName && lastName && phone) {
      // dispatch(saveShippingAddress({ city, street }));
      value();
    } else {
      setMessage("Please fill all the fields");
    }
  };

  return (
    <div className="cc__account__info ">
      <div className="cc__account__info__container ">
        <form action="">
          <div className="cc__account__info__inputs">
            <h3 className="checkOut__heading">CUSTOMER DETAILS</h3>

            <label htmlFor="">
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </label>
            <label htmlFor="">
              First Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </label>
            <label htmlFor="">
              Phone
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </label>
          </div>

          <div className="checkout__next__button__container ">
            <button className="checkout__next__button" onClick={submitHandler}>
              CONTINUE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// shipping👇👇👇

export function CCShipping({ history, value }) {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState("Biratnagar");
  const [street, setStreet] = useState();
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [message, setMessage] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState();
  const cityChange = (e) => {
    const { value } = e.target;

    setCity(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (name && phone && street) {
      var isPossible = isPossiblePhoneNumber(phone);
      console.log("IsPossible ", isPossible);
      var isValid = isValidPhoneNumber(phone);
      console.log("isValid ", isValid);

      if (isPossible === true && isValid === true) {
        dispatch(saveShippingAddress({ name, phone, city, street }));
        value();
      } else {
        setPhoneNumberError("Please enter valid phone number");
      }
    } else {
      setMessage("Please fill all the fields");
    }
  };

  return (
    <div className="cc__account__info ">
      <div className="cc__account__info__container ">
        <form action="">
          <div className="cc__account__info__inputs">
            <h3 className="checkOut__heading">DETAILS</h3>
            <label htmlFor="">
              Full Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </label>
            <label htmlFor="">
              Phone Number (Nepal)
              <PhoneInput country="NP" value={phone} onChange={setPhone} />
            </label>
            {phoneNumberError && (
              <Message variant="danger">{phoneNumberError}</Message>
            )}
            <label htmlFor="">
              Choose Delivery City
              <select name="city" id="city" value={city} onChange={cityChange}>
                <option value="Biratnagar">Biratnagar</option>
                <option value="Duhabi">Duhabi</option>
                <option value="Itahari">Itahari</option>
                <option value="Inaruwa">Inaruwa</option>
                <option value="Jhumka">Jhumka</option>
                <option value="Chitwan">Chitwan</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Saptari">Saptari</option>
                <option value="Siraha">Siraha</option>
              </select>
              <div className="no__location__notice">
                Your location is not in the list? No worry, direct contact us
                through any means. And we shall find a way.
              </div>
              <br />
            </label>
            <label htmlFor="">
              Street, Tole, Ward
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              ></input>
            </label>
          </div>
          {message && <Message variant="danger">{message}</Message>}

          <div className="checkout__next__button__container ">
            <button className="checkout__next__button" onClick={submitHandler}>
              CONTINUE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CCPayment({ history, value }) {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPaymentMethod(value);
  };
  const [paymentMethod, setPaymentMethod] = useState();
  const submitHandler = (e) => {
    if (paymentMethod) {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      value();
    }
  };
  return (
    <div className="cc__payment">
      <div className="payment__method ">
        <h3 className="checkOut__heading"> PAYMENT METHOD</h3>
        <div className="the__payment_form">
          <div>
            <input
              className="paypal__input"
              type="radio"
              name="paymentMethod"
              value="eSewa"
              onChange={handleChange}
            ></input>
            <label for="payment method" className="cash__on__delivery__title">
              eSewa wallet transfer{" "}
              <img src="https://i.imgur.com/RopvzHC.png" alt="" height="30px" />
            </label>
          </div>
          <div>
            <input
              className="paypal__input"
              type="radio"
              name="paymentMethod"
              value="khalti"
              onChange={handleChange}
            ></input>
            <label for="payment method" className="cash__on__delivery__title">
              khalti money transfer{" "}
              <img src="https://i.imgur.com/TrqFdPa.jpg" alt="" height="30px" />
            </label>
          </div>
          <div>
            <input
              className="paypal__input"
              type="radio"
              name="paymentMethod"
              value="bankTransfer"
              onChange={handleChange}
            ></input>
            <label for="payment method" className="cash__on__delivery__title">
              Bank Transfer: Rastra Banijya Bank{" "}
              <AccountBalanceIcon></AccountBalanceIcon>
            </label>
          </div>
          <div>
            <input
              className="paypal__input"
              type="radio"
              name="paymentMethod"
              value="cashOnDelivery"
              onChange={handleChange}
            ></input>
            <label for="payment method" className="cash__on__delivery__title">
              Cash On Delivery
            </label>
          </div>

          <div className="checkout__next__button__container ">
            <button className="checkout__next__button" onClick={submitHandler}>
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PlaceOrder({ history }) {
  const orderArray = {};

  const dispatch = useDispatch();
  var processToOrder = useSelector((state) => state.processToOrder);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { shippingAddress, paymentMethod } = processToOrder;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, loading } = orderCreate;
  const theMainOrderId = order && order["theMainOrderId"];
  console.log("=========tehOrderdss==============");
  console.log(order && theMainOrderId);
  console.log("====================================");
  // const { theMainOrderId } = order && order;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("Cart Items for bag 👇👇👇");
  console.log(cartItems);
  const getTotalPrice = () => {
    // Here while calculating the total price why Naz has not converted the price which is in string into the integer
    var theTotalPrice = 0;
    cartItems.map((item) => {
      return (theTotalPrice += item.total_price);
    });
    return theTotalPrice;
  };
  let initialQuantity = 0;
  const sumWithInitial = cartItems.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    initialQuantity
  );

  // adding order details to order array function
  const addingOrderDetailsFunction = () => {
    orderArray.order_details = {
      customer_id: userInfo && userInfo[0].customerId,
      totalPrice: getTotalPrice(),
      payment_method: paymentMethod,
    };
    orderArray.shipping_details = {
      name: shippingAddress.name,
      phone: shippingAddress.phone,
      city: shippingAddress.city,
      street: shippingAddress.street,
    };
    orderArray.ordered_unique_products = cartItems;
  };
  addingOrderDetailsFunction();
  const placeOrderHandler = () => {
    dispatch(createOrder(orderArray));
    // dispatch(clearProcessToOrder());
  };
  let navigate = useNavigate();

  useEffect(() => {
    if (order) {
      if (success) {
        navigate(`/orders/${theMainOrderId}`);
      }
    }
  }, [order, success, theMainOrderId, navigate]);

  return loading ? (
    <Loader></Loader>
  ) : (
    <div className="cc__place__order">
      <div>
        <div className="checkout__choosed__field">
          <div className="checkout__choosed__field__title">DETAILS,</div>
          <div className="checkout__choosed__field__value">
            {shippingAddress &&
              shippingAddress.name + ", " + shippingAddress.phone}
          </div>
          <div className="checkout__choosed__field__Icon">
            <CheckCircleIcon className="check__circle__icon"></CheckCircleIcon>
          </div>
        </div>

        <div className="checkout__choosed__field">
          <div className="checkout__choosed__field__title">SHIPPING,</div>
          <div className="checkout__choosed__field__value">
            {shippingAddress &&
              shippingAddress.city + ", " + shippingAddress.street}
          </div>
          <div className="checkout__choosed__field__Icon">
            <CheckCircleIcon className="check__circle__icon"></CheckCircleIcon>
          </div>
        </div>
      </div>
      <div className="checkout__choosed__field">
        <div className="checkout__choosed__field__title">DELIVERY PRICE,</div>
        <div className="checkout__choosed__field__value">Free</div>
        <div className="checkout__choosed__field__Icon">
          <CheckCircleIcon className="check__circle__icon"></CheckCircleIcon>
        </div>
      </div>

      <div className="checkout__choosed__field">
        <div className="checkout__choosed__field__title">QUANTITY,</div>
        <div className="checkout__choosed__field__value">{sumWithInitial}</div>
        <div className="checkout__choosed__field__Icon">
          <CheckCircleIcon className="check__circle__icon"></CheckCircleIcon>
        </div>
      </div>
      <div className="payment__method__container">
        <div className="checkout__choosed__field__payment">
          <div className="checkout__choosed__field__title">PAYMENT METHOD,</div>
          <div className="checkout__choosed__field__value">
            {paymentMethod && paymentMethod}
          </div>
          <div className="checkout__choosed__field__Icon">
            <CheckCircleIcon className="check__circle__icon"></CheckCircleIcon>
          </div>
        </div>
        {/* {paymentMethod === "bankTransfer"
            ? bankTransferMethod
            : paymentMethod === "khalti"
            ? khaltiMethod
            : paymentMethod === "eSewa"
            ? eSewaMethod
            : cashOnDeliveryMethod}{" "} */}
      </div>
      <div className="checkout__choosed__field">
        <div className="checkout__choosed__field__title">TOTAL PRICE,</div>
        <div className="checkout__choosed__field__value">
          Rs.{getTotalPrice()}
        </div>
        <div className="checkout__choosed__field__Icon">
          <CheckCircleIcon className="check__circle__icon"></CheckCircleIcon>
        </div>
      </div>
      <button className="place__order__button" onClick={placeOrderHandler}>
        {order === true ? "Hii" : "Place Order"}
      </button>
    </div>
  );
}
