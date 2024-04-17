export const debounce = (func: () => void, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export const buildQuery = ({ priceRange, ratingRange, inStock, hasReviews, index, navigate }) => {
  const [minPrice, maxPrice] = priceRange;
  const [minRate, maxRate] = ratingRange;

  const host = 'http://localhost:8000/products';
  const paginationParams = `?_start=0&_limit=${index * 10}&`;
  let queryParams = '';

  queryParams += `price_gte=${minPrice}&price_lte=${maxPrice}`;
  queryParams += `&rating.rate_gte=${minRate}&rating.rate_lte=${maxRate}`;

  if (inStock) {
      queryParams += `&stock_gt=0`;
  }

  if (hasReviews) {
      queryParams += `&rating.count_gte=0.1`;
  }

  navigate(`?${queryParams}`);
  

  return host + paginationParams + queryParams;
}