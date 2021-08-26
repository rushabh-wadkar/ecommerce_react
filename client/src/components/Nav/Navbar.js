import React from "react";
import classes from "./Navbar.module.css";
import { connect } from "react-redux";
import {
  fetchProducts,
  searchProducts,
} from "../../redux/actions/productlist.actions";
import _ from "lodash";

const Navbar = ({ fetchProducts, searchProduct }) => {
  const sortOptionHandler = (e) => {
    fetchProducts(e.target.value);
  };
  const onSearchChangeHandler = (event) => {
    event.persist();

    let searchString = event.target.value;
    searchProduct(searchString);
  };
  return (
    <nav className={classes.product_filter}>
      <h1>Products</h1>

      <div className={classes.sort}>
        <div className={classes.collection_sort}>
          <label>Search</label>
          <input
            type="text"
            onChange={_.debounce(onSearchChangeHandler, 300)}
            placeholder="Search Product"
          ></input>
        </div>

        <div className={classes.collection_sort}>
          <label>Sort by:</label>
          <select defaultValue="" onChange={sortOptionHandler}>
            <option value=""></option>
            <option value="ASC">Price, low to high</option>
            <option value="DESC">Price, high to low</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (sortOption) => dispatch(fetchProducts(sortOption)),
    searchProduct: (value) => dispatch(searchProducts(value)),
  };
};

const MemoizedNav = React.memo(Navbar);

export default connect(null, mapDispatchToProps)(MemoizedNav);
