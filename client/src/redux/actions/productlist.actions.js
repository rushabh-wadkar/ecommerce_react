import axios from "axios";
import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
} from "./actionTypes";

export const fetchProducts_request = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  };
};

export const fetchProducts_success = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const fetchProducts_failure = (error) => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
};

// Thunks
export const fetchProducts = (sortBy) => {
  return (dispatch) => {
    let url = "/api/products";
    if (sortBy) {
      url += "?sort=" + sortBy;
    }
    dispatch(fetchProducts_request());
    axios
      .get(url)
      .then((response) => {
        // response.data is the products
        const products = response.data;
        dispatch(fetchProducts_success(products));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchProducts_failure(error.message));
      });
  };
};

export const searchProducts = (searchBy) => {
  return (dispatch) => {
    let url = "/api/products";
    if (searchBy) {
      url += "?search=" + searchBy;
    }
    dispatch(fetchProducts_request());
    axios
      .get(url)
      .then((response) => {
        // response.data is the products
        const products = response.data;
        dispatch(fetchProducts_success(products));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchProducts_failure(error.message));
      });
  };
};

export const getProduct = (product_id) => {
  return (dispatch) => {
    let url = "/api/product/" + product_id;
    dispatch(fetchProducts_request());
    axios
      .get(url)
      .then((response) => {
        // response.data is the products
        const products = response.data;
        dispatch(fetchProducts_success(products));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchProducts_failure(error.message));
      });
  };
};
