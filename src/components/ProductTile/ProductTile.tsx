import classes from "./ProductTile.module.scss";
import noimage from "../../assets/noimage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { useState } from "react";

const ProductTile = ({ product }) => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (
    <div className={classes.tile}>
      <div className={classes.image}>
        <img src={product.image || noimage} alt="product image" />
      </div>
      <div className={classes.description}>
        <div className={classes.title}>{product.title}</div>
        <div className={classes.countBlock}>
          {count ? (
            <div className={classes.count}>
              <Button variant="contained" onClick={decrement}>
                -
              </Button>
              <span>{count}</span>
              <Button variant="contained" onClick={increment}>
                +
              </Button>
            </div>
          ) : (
            <Button
              className={classes.addBtn}
              variant="contained"
              onClick={increment}
            >
              Add To Cart
            </Button>
          )}
        </div>
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
