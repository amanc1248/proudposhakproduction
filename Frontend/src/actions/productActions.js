import axios from "axios";
import {
  CATEGORY_PRODUCTS_DETAILS,
  CATEGORY_PRODUCTS_DETAILS_FAIL,
  CATEGORY_PRODUCTS_DETAILS_SUCCESS,
  PRODUCT_CATEGORIES_DETAILS,
  PRODUCT_CATEGORIES_DETAILS_FAIL,
  PRODUCT_CATEGORIES_DETAILS_SUCCESS,
  PRODUCT_DETAILS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_SUB_CATEGORIES_DETAILS,
  PRODUCT_SUB_CATEGORIES_DETAILS_FAIL,
  PRODUCT_SUB_CATEGORIES_DETAILS_SUCCESS,
  SUB_CATEGORY_PRODUCTS_DETAILS,
  SUB_CATEGORY_PRODUCTS_DETAILS_FAIL,
  SUB_CATEGORY_PRODUCTS_DETAILS_SUCCESS,
} from "../constants/productConstants";

export const productScreenProductDetailsAction =
  (productId) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAILS,
      });
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/product/getProductScreenDetails/${productId}`,
        config
      );
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const categoryProductDetailsAction =
  (categoryId) => async (dispatch) => {
    try {
      dispatch({
        type: CATEGORY_PRODUCTS_DETAILS,
      });
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/product/categoryProducts/${categoryId}`,
        config
      );
      dispatch({
        type: CATEGORY_PRODUCTS_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_PRODUCTS_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const subCategoryProductDetailsAction =
  (subCategoryName, subCategoryId) => async (dispatch) => {
    try {
      dispatch({
        type: SUB_CATEGORY_PRODUCTS_DETAILS,
      });
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/product/subCategoryProducts/${subCategoryName}/${subCategoryId}`,
        config
      );
      dispatch({
        type: SUB_CATEGORY_PRODUCTS_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUB_CATEGORY_PRODUCTS_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const productCategoriesDetailsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CATEGORIES_DETAILS,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/product/productCategories`, config);
    dispatch({
      type: PRODUCT_CATEGORIES_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORIES_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productSubCategoriesDetailsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_SUB_CATEGORIES_DETAILS,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/product/productSubCategories`,
      config
    );
    dispatch({
      type: PRODUCT_SUB_CATEGORIES_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SUB_CATEGORIES_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
