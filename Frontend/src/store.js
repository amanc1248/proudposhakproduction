import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { adminProductTypeDetailsReducer } from "./reducers/adminReducers";
import {
  categoryProductDetailsReducer,
  ProductCategoriesDetailsReducer,
  productDetailsReducer,
  productSubCategoriesDetailsReducer,
  subCategoryProductDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer, processToOrderReducers } from "./reducers/cartReducers";
import { userLoginReducer } from "./reducers/customerReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  // for admin
  adminProductTypeDetails: adminProductTypeDetailsReducer,

  // for product
  productScreenProductDetails: productDetailsReducer,
  categoryProducts: categoryProductDetailsReducer,
  subCategoryProducts: subCategoryProductDetailsReducer,
  productCategories: ProductCategoriesDetailsReducer,
  productSubCategories: productSubCategoriesDetailsReducer,
  // cart reducers
  cart: cartReducer,
  processToOrder: processToOrderReducers,

  // customer info
  userLogin: userLoginReducer,

  // order reducers
  orderCreate: orderCreateReducer,
  orderListMy: orderListMyReducer,
  orderDetails: orderDetailsReducer,
});
const middleware = [thunk];
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
