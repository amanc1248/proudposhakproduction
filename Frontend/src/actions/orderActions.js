import axios from "axios";
import {
  CLEAR_PROCESS_TO_ORDER,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
} from "../constants/ordersConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // The below line is responsible for the backend connect, it goes to the respected route and does the backend work and then again comes back
    const { data } = await axios.post(`/api/orders`, order, config);
    console.log("==================================== thhe order data👇");
    console.log(data);
    console.log("====================================");
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearProcessToOrder = (data) => (dispatch, getState) => {
  dispatch({
    type: CLEAR_PROCESS_TO_ORDER,
    payload: data,
  });
};

export const listMyOrders = (customerId) => async (dispatch, getState) => {
  console.log("====CCCCCCCccc================================");
  console.log(customerId);
  console.log("====================================");
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // The below line is responsible for the backend connect, it goes to the respected route and does the backend work and then again comes back
    const { data } = await axios.get(
      `/api/orders/myorders/${customerId}`,
      { customerId },
      config
    );
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // The below line is responsible for the backend connect, it goes to the respected route and does the backend work and then again comes back
    const { data } = await axios.get(`/api/orders/${id}`, config);
    console.log("the orders data👇👇👇");
    console.log(data);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
