import { Link } from "react-router-dom";
import classes from "./ProductList.module.css";

const ProductListItem = ({ data }) => {
  const disc_perc =
    data.retail_price && data.discounted_price
      ? Math.ceil((data.discounted_price / data.retail_price) * 100) + "% off"
      : "";

  const retail_price_display = data.retail_price
    ? `₹ ${data.retail_price}`
    : "";
  const brand = data.brand ? data.brand : "-";
  return (
    <Link to={`/product/${data.uniq_id}`}>
      <figure>
        <img
          alt={`Showing Product: ${data.product_name}`}
          src={data.image[0]}
        />
        <span className={classes.brand}>{brand}</span>
        <figcaption>{data.product_name}</figcaption>
        <span className={classes.price}>{retail_price_display}</span>
        <span className={classes.discount_price}>
          ₹&nbsp;{data.discounted_price}
        </span>
        <span className={classes.discount_percent}>{disc_perc}</span>
      </figure>
    </Link>
  );
};

export default ProductListItem;
