import classes from "./ProductTile.module.scss";
import noimage from "../../assets/noimage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { useState } from "react";
import ProductType from "../../models/Product.model.tsx";
import { useAppDispatch } from "../../redux/utils.ts";
import { addItemToCart, removeItemFromCart, updateCartItemCount } from "../../redux/thunks/cart.ts";
interface ProductTileProps {
  product: ProductType;
  count: number;
}

const ProductTile = ({ product, count }: ProductTileProps) => {
  const dispatch = useAppDispatch();
  const [productCount, setProductCount] = useState(count);

  const updateCount = (newCount: number) => {
    if (newCount === 0) {
      dispatch(removeItemFromCart(product.id));
    } else if (productCount === 0 && newCount > 0) {
      dispatch(addItemToCart(product, newCount));
    } else {
      dispatch(updateCartItemCount(product.id, newCount));
    }

    setProductCount(newCount);
  };

  return (
    <div className={classes.tile}>
      <div className={classes.image}>
        <img src={product?.image || noimage} alt="product image" />
      </div>
      <div className={classes.description}>
        <div className={classes.title}>{product?.title}</div>
        <div className={classes.countBlock}>
          {productCount ? (
            <div className={classes.count}>
              <Button
                variant="contained"
                onClick={() => updateCount(productCount - 1)}
              >
                -
              </Button>
              <span>{productCount}</span>
              <Button
                variant="contained"
                onClick={() => updateCount(productCount + 1)}
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              className={classes.addBtn}
              variant="contained"
              onClick={() => updateCount(productCount + 1)}
            >
              Add To Cart
            </Button>
          )}
        </div>
        <div className={classes.bottomBlock}>
          <div className={classes.rating}>
            <FontAwesomeIcon icon={faStar} /> {product?.rating?.rate}
          </div>
          <div className={classes.price}>{product?.price}$</div>
        </div>
      </div>
    </div>
  );
};

export default ProductTile;
