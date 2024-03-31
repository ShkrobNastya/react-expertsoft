import classes from "./ProductTile.module.scss";
import noimage from "../../assets/noimage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ProductTile = ({ product }) => {
  return (
    <div className={classes.tile}>
      <div className={classes.image}>
        <img src={product.image || noimage} alt="product image" />
      </div>
      <div className={classes.description}>
        <div className={classes.title}>{product.title}</div>
        <div className={classes.bottomBlock}>
          <div className={classes.rating}>
            <FontAwesomeIcon icon={faStar} /> {product.rating.rate}
          </div>
          <div className={classes.price}>{product.price}$</div>
        </div>
      </div>
    </div>
  );
};

export default ProductTile;
