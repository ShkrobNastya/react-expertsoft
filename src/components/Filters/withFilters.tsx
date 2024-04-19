import { Dispatch, FunctionComponent, SetStateAction, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-types
const throttle = (func: Function, limit: number) => {
  let inThrottle = false;
  return (...args: []) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100;
const DEFAULT_MIN_RATE = 0;
const DEFAULT_MAX_RATE = 5;

export type FilterPropsType = {
  priceRange: number[],
  ratingRange: number[],
  inStock: boolean,
  hasReviews: boolean,
  handlePriceChange: (value: number | number[], changedFilter: string) => void,
  handleRatingChange: (value: number | number[], changedFilter: string) => void,
  handleInStockChange: (isChecked: boolean) => void,
  handleHasReviewsChange: (isChecked: boolean) => void,
  handleClearFilters: () => void
}

const withFilters = (WrappedComponent: FunctionComponent<FilterPropsType>) => {
  const WithFilters = () => {
    const [searchParams] = useSearchParams();
    const minPrice = Number(searchParams.get("price_gte")) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(searchParams.get("price_lte")) || DEFAULT_MAX_PRICE;
    const minRate = Number(searchParams.get("rating.rate_gte")) || DEFAULT_MIN_RATE;
    const maxrate = Number(searchParams.get("rating.rate_lte")) || DEFAULT_MAX_RATE;
    const isInStock = !!searchParams.get("stock_gt");
    const reviewsExist = !!searchParams.get("rating.count_gte");

    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
    const [ratingRange, setRatingRange] = useState([minRate, maxrate]);
    const [inStock, setInStock] = useState(isInStock);
    const [hasReviews, setHasReviews] = useState(reviewsExist);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      if (!location.search) {
        setPriceRange([DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE]);
        setRatingRange([DEFAULT_MIN_RATE, DEFAULT_MAX_RATE]);
        setInStock(false);
        setHasReviews(false);
      }
    }, [location]);

    const handleRangeChange = (
      value: number | number[],
      changedFilter: string,
      setValue: Dispatch<SetStateAction<number[]>>,
    ) => {
      if (Array.isArray(value)) {
        setValue(value);
        return;
      }

      if (changedFilter === "from") {
        setValue((prevRange) => [value, prevRange[1]]);
        return;
      }

      if (changedFilter === "to") {
        setValue((prevRange) => [prevRange[0], value]);
        return;
      }
    };

    const handlePriceChange = useCallback(
      throttle((value: number | number[], changedFilter: string) => {
        handleRangeChange(value, changedFilter, setPriceRange);
      }, 300),
      [],
    );

    const handleRatingChange = useCallback(
      throttle((value: number | number[], changedFilter: string) => {
        handleRangeChange(value, changedFilter, setRatingRange);
      }, 300),
      [],
    );

    const handleInStockChange = (isChecked: boolean) => {
      setInStock(isChecked);
    };

    const handleHasReviewsChange = (isChecked: boolean) => {
      setHasReviews(isChecked);
    };

    const handleClearFilters = () => {
      navigate("/");
    };

    const filterProps: FilterPropsType = {
      priceRange,
      ratingRange,
      inStock,
      hasReviews,
      handlePriceChange,
      handleRatingChange,
      handleInStockChange,
      handleHasReviewsChange,
      handleClearFilters
    };

    return <WrappedComponent {...filterProps} />;
  };

  WithFilters.displayName = `withFilters(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithFilters;
};

export default withFilters;
