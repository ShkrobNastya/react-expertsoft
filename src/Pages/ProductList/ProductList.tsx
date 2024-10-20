import ProductTile from "../../components/ProductTile";
import classes from "./ProductList.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Filters from "../../components/Filters";
import { Suspense } from "react";
import withFilters, {
  FilterPropsType,
} from "../../components/Filters/withFilters";
import useProducts from "./useProducts";
import { useAppSelector } from "../../redux/utils";

const ProductList = (filterProps: FilterPropsType) => {
  const { products, error, isLoading, isPending } = useProducts({
    filterProps,
  });
  const cart = useAppSelector(state => state.cart);

  return (
    <Suspense fallback={<CircularProgress />}>
      <div className={classes.container}>
        <Filters {...filterProps} />
        <div className={classes.wrapper}>
          {error && <div>{error}</div>}
          {(isPending || cart.isLoading) && (
            <CircularProgress
              sx={{ width: "100px" }}
              color="inherit"
              className="spinner"
            />
          )}
          {!products.length && (
            <div className={classes.noProducts}>No Products found</div>
          )}
          {products &&
            products.map((product) => {
              const item = cart?.items?.find((cartItem) => cartItem.id === product.id);
              const count = item?.count || 0;
              return (
                <ProductTile key={product.id} product={product} count={count} />
              );
            })}
          {(isLoading || cart.isLoading) && <CircularProgress />}
        </div>
      </div>
    </Suspense>
  );
};

export default withFilters(ProductList);
