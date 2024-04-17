import ProductTile from "../../components/ProductTile";
import classes from "./ProductList.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Filters from "../../components/Filters";
import {Suspense} from "react";
import withFilters from "../../components/Filters/withFilters";
import useProducts from "./useProducts";

const ProductList = (filterProps) => {
  const { products, cart, error, isLoading, isPending } = useProducts({ filterProps });
    
  return (
    <Suspense fallback={<CircularProgress />}>
        <div className={classes.container}>
        <Filters {...filterProps} />
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
                products.map((product) => {
                    const item = cart?.find((cartItem) => cartItem.id === product.id);
                    const count = item?.count || 0;
                    return (
                        <ProductTile key={product.id} product={product} count={count} />
                    );
                })}
            {isLoading && (
                <CircularProgress />
            )}
        </div>
        </div>
    </Suspense>
  );
};

export default withFilters(ProductList);
