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

export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, productScreenDetails: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const categoryProductDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_PRODUCTS_DETAILS:
      return { loading: true };
    case CATEGORY_PRODUCTS_DETAILS_SUCCESS:
      return { loading: false, categoryProductDetails: action.payload };
    case CATEGORY_PRODUCTS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ProductCategoriesDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORIES_DETAILS:
      return { loading: true };
    case PRODUCT_CATEGORIES_DETAILS_SUCCESS:
      return { loading: false, productCategoriesDetails: action.payload };
    case PRODUCT_CATEGORIES_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productSubCategoriesDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_SUB_CATEGORIES_DETAILS:
      return { loading: true };
    case PRODUCT_SUB_CATEGORIES_DETAILS_SUCCESS:
      return { loading: false, productSubCategoriesDetails: action.payload };
    case PRODUCT_SUB_CATEGORIES_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subCategoryProductDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SUB_CATEGORY_PRODUCTS_DETAILS:
      return { loading: true };
    case SUB_CATEGORY_PRODUCTS_DETAILS_SUCCESS:
      return { loading: false, subCategoryProductDetails: action.payload };
    case SUB_CATEGORY_PRODUCTS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
