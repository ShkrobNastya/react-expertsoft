import classes from "./ProductTile.module.scss";
import noimage from "../../assets/noimage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { useState } from "react";
import ProductType from "../../models/Product.model.tsx";

const changeProductCount = (product: ProductType, count: number) => {
  fetch(`http://localhost:8000/cart/${product.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      count: count,
    }),
  }).catch((error) => {
    console.log("Error " + error.message);
  });
};

const addToCart = (product: ProductType, count: number) => {
  fetch("http://localhost:8000/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: product.id,
      title: product.title,
      count: count,
      price: product.price,
    }),
  }).catch((error) => {
    console.log("Error " + error.message);
  });
};

const removeFromCart = (product: ProductType) => {
  fetch("http://localhost:8000/cart/" + product.id, {
    method: "DELETE",
  }).catch((error) => {
    console.log("Error " + error.message);
  });
};

interface ProductTileProps {
  product: ProductType;
  count: number;
}

const ProductTile = ({ product, count }: ProductTileProps) => {
  const [productCount, setProductCount] = useState(count);

  const updateCount = (newCount: number) => {
    if (newCount === 0) {
      removeFromCart(product);
    } else if (productCount === 0 && newCount > 0) {
      addToCart(product, newCount);
    } else {
      changeProductCount(product, newCount);
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
