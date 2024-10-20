import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buildQuery, debounce } from "./utils";
import { FilterPropsType } from "../../components/Filters/withFilters";
import { useAppDispatch, useAppSelector } from "../../redux/utils.ts";
import { setProductsData } from "../../redux/Actions.tsx";
import { IInitialState } from "../../redux/Reducers.tsx";
import { fetchCart } from "../../redux/thunks/cart.ts";


type UseProductsProps = {
  filterProps: FilterPropsType;
};

const useProducts = ({ filterProps }: UseProductsProps) => {
  const [error, setError] = useState<string | null>(null);

  const products = useAppSelector((state:IInitialState) => state.products);
  const cart = useAppSelector((state:IInitialState) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [index, setIndex] = useState(1);

  const dispatch = useAppDispatch();

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
        dispatch(setProductsData(data));
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setIndex((prevIndex) => prevIndex + 1);
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isLoading, priceRange, ratingRange, inStock, hasReviews]);

  useEffect(() => {
    dispatch(fetchCart())
  }, [cart.items.length, dispatch]);

  useEffect(() => {
    const getData = () => {
      setIsPending(true);
      const query = buildQuery({ ...filterProps, index, navigate });

      fetch(query)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          dispatch(setProductsData(res));
        })
        .catch((err) => setError(err.message))
        .finally(() => setIsPending(false));
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    error,
    isLoading,
    isPending,
  };
};

export default useProducts;
