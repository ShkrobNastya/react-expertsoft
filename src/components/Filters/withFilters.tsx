import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFilters } from "../../redux/Actions";
import { useAppSelector } from "../../redux/utils";
import { DEFAULT_MAX_PRICE, DEFAULT_MAX_RATE, DEFAULT_MIN_PRICE, DEFAULT_MIN_RATE, IInitialState } from "../../redux/Reducers";

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
};

export type FilterPropsType = {
  priceRange: number[];
  ratingRange: number[];
  inStock: boolean;
  hasReviews: boolean;
  handlePriceChange: (value: number | number[], changedFilter: string) => void;
  handleRatingChange: (value: number | number[], changedFilter: string) => void;
  handleInStockChange: (isChecked: boolean) => void;
  handleHasReviewsChange: (isChecked: boolean) => void;
  handleClearFilters: () => void;
};

const withFilters = (WrappedComponent: FunctionComponent<FilterPropsType>) => {
  const WithFilters = () => {
    const filters = useAppSelector((state: IInitialState) => state.filters);

    const [searchParams] = useSearchParams();

    const minPrice = Number(searchParams.get("price_gte")) || filters.priceRange[0];
    const maxPrice = Number(searchParams.get("price_lte")) || filters.priceRange[1];
    const minRate = Number(searchParams.get("rating.rate_gte")) || filters.ratingRange[0];
    const maxRate = Number(searchParams.get("rating.rate_lte")) || filters.ratingRange[1];
    const isInStock = !!searchParams.get("stock_gt") || filters.inStock;
    const reviewsExist = !!searchParams.get("rating.count_gte") || filters.hasReviews;

    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
    const [ratingRange, setRatingRange] = useState([minRate, maxRate]);
    const [inStock, setInStock] = useState(isInStock);
    const [hasReviews, setHasReviews] = useState(reviewsExist);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(updateFilters({ priceRange, ratingRange, inStock, hasReviews }))
    }, [dispatch, priceRange, ratingRange, inStock, hasReviews])

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
      setPriceRange([DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE]);
      setRatingRange([DEFAULT_MIN_RATE, DEFAULT_MAX_RATE]);
      setInStock(false);
      setHasReviews(false);

      dispatch(updateFilters({
        priceRange: [DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE],
        ratingRange: [DEFAULT_MIN_RATE, DEFAULT_MAX_RATE],
        inStock: false,
        hasReviews: false,
      }))
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
      handleClearFilters,
    };

    return <WrappedComponent {...filterProps} />;
  };

  WithFilters.displayName = `withFilters(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithFilters;
};

export default withFilters;
