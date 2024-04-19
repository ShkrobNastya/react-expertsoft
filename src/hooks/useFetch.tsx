import { useState, useEffect } from "react";

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsPending(false);
      });

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
