import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: data,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (item) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: item,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(getState().processToOrder.shippingAddress)
  );
};

export const savePaymentMethod = (data) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem(
    "paymentMethod",
    JSON.stringify(getState().processToOrder.paymentMethod)
  );
};
