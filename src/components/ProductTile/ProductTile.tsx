import classes from "./ProductTile.module.scss";
import noimage from "../../assets/noimage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ProductTile = () => {
  return (
    <div className={classes.tile}>
      <div className={classes.image}>
        <img src={noimage} alt="product image" />
      </div>
      <div className={classes.description}>
        <div className={classes.title}>Product tile</div>
        <div className={classes.bottomBlock}>
          <div className={classes.rating}>
            <FontAwesomeIcon icon={faStar} /> 5
          </div>
          <div className={classes.price}>55$</div>
        </div>
      </div>
    </div>
  );
};

export default ProductTile;
