import {
  ADMIN_GET_PRODUCT_TYPE_DETAILS,
  ADMIN_GET_PRODUCT_TYPE_DETAILS_FAIL,
  ADMIN_GET_PRODUCT_TYPE_DETAILS_SUCCESS,
} from "../constants/adminConstants";

export const adminProductTypeDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_PRODUCT_TYPE_DETAILS:
      return { loading: true };
    case ADMIN_GET_PRODUCT_TYPE_DETAILS_SUCCESS:
      return { loading: false, productTypeDetailsInfo: action.payload };
    case ADMIN_GET_PRODUCT_TYPE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
