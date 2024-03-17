import ProductTile from "../../components/ProductTile/ProductTile";
import classes from "./ProductList.module.scss";

const ProductList = () => {
  return (
    <div className={classes.wrapper}>
      <ProductTile />
      <ProductTile />

      <ProductTile />
      <ProductTile />
      <ProductTile />
      <ProductTile />
      <ProductTile />
    </div>
  );
};

export default ProductList;
