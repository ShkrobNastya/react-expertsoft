import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buildQuery, debounce } from "./utils";
import useFetch from "../../hooks/useFetch";

const useProducts = ({ filterProps }) => {
  const [error, setError] = useState(null);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [index, setIndex] = useState(1);

  const { data: cart = {} } = useFetch(`http://localhost:8000/cart`);

  const { priceRange, ratingRange, inStock, hasReviews } = filterProps;

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
      if (isLoading) return;
      setIsLoading(true);
      const query = buildQuery({ ...filterProps, index, navigate });

      fetch(query, {signal: AbortSignal.timeout(5000)})
          .then((res) => {
              return res.json();
          }).then((data) => {
          setProducts(data);
      }).finally(() => {
          setIndex((prevIndex) => prevIndex + 1);
          setIsLoading(false);
      }).catch((err) => setError(err.message));


  }, [index, isLoading, priceRange, ratingRange, inStock, hasReviews]);

  useEffect(() => {
      const getData = async () => {
          setIsPending(true);
          const query = buildQuery({ ...filterProps, index, navigate });
          try {
              await fetch(query).then((res)=> {
                  return res.json();
              }).then((res) => {
                  setProducts(res);
              }).finally(() => setIsPending(false));
          } catch (error) {
              setError(error.message);
          }
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
    products,
    cart,
    error,
    isLoading,
    isPending
  }
}

export default useProducts;