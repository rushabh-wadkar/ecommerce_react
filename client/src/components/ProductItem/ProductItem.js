import classes from "./ProductItem.module.css";
import backButtonClass from "./Backbutton.module.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getProduct } from "../../redux/actions/productlist.actions";
import Carousel from "react-images";
import ReactLoading from "react-loading";

const ProductItem = ({ getProduct, product }) => {
  const { id } = useParams();
  let history = useHistory();

  const goBackHandler = () => {
    history.push("/");
  };

  useEffect(() => {
    getProduct(id);
  }, [getProduct, id]);

  if (product.loading) {
    return (
      <div className="loading_bar">
        <ReactLoading type="bars" color={"grey"} />
      </div>
    );
  }

  if (product.error) {
    return <h2>{product.error}</h2>;
  }
  const item = product.products[0];
  if (!item) {
    return <h3>No Product</h3>;
  }
  console.log(item);
  const images = item.image.map((i) => ({ source: i }));
  return (
    <div>
      <div className={backButtonClass.backBtn} onClick={goBackHandler}>
        <span
          className={`${backButtonClass.line} ${backButtonClass.tLine}`}
        ></span>
        <span
          className={`${backButtonClass.line} ${backButtonClass.mLine}`}
        ></span>
        <span className={backButtonClass.label}>Back</span>
        <span
          className={`${backButtonClass.line} ${backButtonClass.bLine}`}
        ></span>
      </div>
      <div className={classes.columns}>
        <div className={classes.column}>
          <div className={classes["thumbnail-container"]}>
            <Carousel views={images} />
          </div>
        </div>

        <div className={classes.column}>
          <div className="detail">
            <h1>{item.product_name}</h1>
            <p className={classes.price}>
              <span>₹ {item.retail_price}</span>
              <span
                style={{ marginLeft: "10px", textDecoration: "line-through" }}
              >
                ₹ {item.discounted_price}
              </span>
            </p>
            <p className={classes.description}>{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.product_list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
