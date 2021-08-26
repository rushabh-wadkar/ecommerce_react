import classes from "./ProductList.module.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../redux/actions/productlist.actions";
import ProductListItem from "./ProductListItem";
import ReactLoading from "react-loading";

const ProductList = ({ productsData, fetchProducts }) => {
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return productsData.loading ? (
    <div className="loading_bar">
      <ReactLoading type="bars" color={"grey"} />
    </div>
  ) : productsData.error ? (
    <h2>{productsData.error}</h2>
  ) : (
    <div className={classes.wrap}>
      <span style={{ fontSize: "0.6rem" }}>
        Showing {productsData.products.length} products
      </span>
      <div className={classes.columns_3} id={classes.columns}>
        {productsData.products.map((product) => (
          <ProductListItem key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    productsData: state.product_list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
