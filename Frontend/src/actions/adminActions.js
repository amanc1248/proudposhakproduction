import axios from "axios";
import {
  ADMIN_GET_PRODUCT_TYPE_DETAILS,
  ADMIN_GET_PRODUCT_TYPE_DETAILS_FAIL,
  ADMIN_GET_PRODUCT_TYPE_DETAILS_SUCCESS,
} from "../constants/adminConstants";
export const adminGetProductTypeDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_GET_PRODUCT_TYPE_DETAILS,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/admin/getProductTypeDetails`,
      config
    );
    dispatch({
      type: ADMIN_GET_PRODUCT_TYPE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_PRODUCT_TYPE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
