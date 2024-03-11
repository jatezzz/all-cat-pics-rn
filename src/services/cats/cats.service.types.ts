import { useEffect, useState } from "react";
import { getExternalCats } from "services/cats/cats.service";

export const useGetCats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cats, setCats] = useState<string[]>([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const cats = await getExternalCats();
      setCats(cats);
    } catch (err) {
      // @ts-ignore
      setError(err);
    }
  };
  const getProducts = async () => {
    setIsLoading(true);
    await fetchProducts();
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      await getProducts();
    })();
  }, []);

  return { isLoading, cats, error };
};
