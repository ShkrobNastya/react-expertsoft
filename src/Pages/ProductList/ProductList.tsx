import ProductTile from "../../components/ProductTile";
import classes from "./ProductList.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import useFetch from "../../hooks/useFetch";

const ProductList = () => {
  const {
    data: products,
    isPending,
    error,
  } = useFetch("http://localhost:8000/products");

  return (
    <div className={classes.wrapper}>
      {error && <div>{error}</div>}
      {isPending && (
        <CircularProgress
          sx={{ width: "100px" }}
          color="inherit"
          className="spinner"
        />
      )}
      {products &&
        products.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductList;
