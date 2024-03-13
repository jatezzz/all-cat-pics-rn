import { useEffect, useState } from "react";
import { Cat } from "types/Cat";
import { useCats } from "@/src/cats/context/useCats";

export const useCatList = () => {
  const { repository } = useCats();
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const loadNextPage = async () => {
    setIsLoading(true);
    try {
      const newCats = await repository.getList(currentPage);
      setCats((prevCats) => [...prevCats, ...newCats]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNextPage();
  }, [repository]);

  return { cats, isLoading, error, loadNextPage };
};
