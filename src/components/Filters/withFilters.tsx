import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function throttle(func, limit) {
  let inThrottle = false;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

const withFilters = (WrappedComponent) => {
  console.log('Filters Container');
  const WithFilters = (props) => {
    const [searchParams] = useSearchParams();
    const minPrice = Number(searchParams.get('price_gte')) || 0;
    const maxPrice = Number(searchParams.get('price_lte')) || 100;
    const minRate = Number(searchParams.get('rating.rate_gte')) || 0;
    const maxrate = Number(searchParams.get('rating.rate_lte')) || 5;
    const isInStock = !!searchParams.get('stock_gt');
    const reviewsExist = !!searchParams.get('rating.count_gte');

    console.log({ minPrice, maxPrice, minRate, maxrate, isInStock, reviewsExist });  

    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
    const [ratingRange, setRatingRange] = useState([minRate, maxrate]);
    const [inStock, setInStock] = useState(isInStock);
    const [hasReviews, setHasReviews] = useState(reviewsExist);

    const handleRangeChange = (value: number | number[], changedFilter: string, setValue: Dispatch<SetStateAction<number[]>>) => {
      if (Array.isArray(value)) {
        setValue(value);
        return;
      }

      if (changedFilter === 'from') {
        setValue((prevRange) => [value, prevRange[1]]);
        return;
      }

      if (changedFilter === 'to') {
        setValue((prevRange) => [prevRange[0], value]);
        return;
      }
    }

    const handlePriceChange = useCallback(throttle((value: number | number[], changedFilter: string) => {
      handleRangeChange(value, changedFilter, setPriceRange);
    }, 300), []);

    const handleRatingChange = useCallback(throttle((value: number | number[], changedFilter: string) => {
      handleRangeChange(value, changedFilter, setRatingRange);
    }, 300), []);

    const handleInStockChange = (isChecked: boolean) => {
      setInStock(isChecked);
    };

    const handleHasReviewsChange = (isChecked: boolean) => {
      setHasReviews(isChecked);
    };

    const filterProps = {
      priceRange,
      ratingRange,
      inStock,
      hasReviews,
      handlePriceChange,
      handleRatingChange,
      handleInStockChange,
      handleHasReviewsChange
    };

    return <WrappedComponent {...props} {...filterProps} />;
  };

  WithFilters.displayName = `withFilters(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithFilters;
};

export default withFilters;
