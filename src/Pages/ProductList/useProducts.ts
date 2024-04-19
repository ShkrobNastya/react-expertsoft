import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buildQuery, debounce } from "./utils";
import useFetch from "../../hooks/useFetch";
import { FilterPropsType } from "../../components/Filters/withFilters";
import OrderType from "../../models/Order.model.tsx";
import ProductType from "../../models/Product.model.tsx";

type UseProductsProps = {
  filterProps: FilterPropsType
}

const useProducts = ({ filterProps }: UseProductsProps) => {
  const [error, setError] = useState<string | null>(null);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [index, setIndex] = useState(1);

  const { data: cart } = useFetch<OrderType[]>(`http://localhost:8000/cart`);

  const { priceRange, ratingRange, inStock, hasReviews } = filterProps;

  const navigate = useNavigate();

  const fetchData = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    const query = buildQuery({ ...filterProps, index, navigate });

    fetch(query, { signal: AbortSignal.timeout(5000) })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setIndex((prevIndex) => prevIndex + 1);
        setIsLoading(false);
      });
  }, [index, isLoading, priceRange, ratingRange, inStock, hasReviews]);

  useEffect(() => {
    const getData = () => {
      setIsPending(true);
      const query = buildQuery({ ...filterProps, index, navigate });

      fetch(query)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setProducts(res);
        })
        .catch((err) => setError(err.message))
        .finally(() => setIsPending(false));
    };
    getData();
  }, [index, priceRange, ratingRange, inStock, hasReviews]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };

    const debouncedScroll = debounce(handleScroll);

    window.addEventListener("scroll", debouncedScroll);
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, [fetchData]);

  return {
    products: products || [],
    cart: cart || [],
    error,
    isLoading,
    isPending,
  };
};

export default useProducts;
