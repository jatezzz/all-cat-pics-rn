import { useCats } from "../cats/context/useCats";
import { useEffect, useState } from "react";
import { Cat } from "../types/Cat";

export const useCatDetails = (catId: string) => {
  const { repository } = useCats();
  const [cat, setCat] = useState<Cat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCatDetail = async () => {
      setIsLoading(true);
      try {
        const fetchedCat = await repository.getDetail(catId);
        setCat(fetchedCat);
      } catch (error) {
        console.error(error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatDetail();
  }, [catId, repository]);

  return { cat, isLoading, error };
};
