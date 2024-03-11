import { useEffect, useState } from "react";
import { Cat } from "../../types/Cat";
import { CatRepository } from "../../services/cats/CatRepository";
import { CatAPIService } from "../../services/cats/CatAPIService";
import { CatLocalStorage } from "../../services/cats/CatLocalStorage";

export const useGetCats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [cats, setCats] = useState<Cat[]>([]);
  const [error, setError] = useState(null);

  const repository = new CatRepository(new CatAPIService(), new CatLocalStorage());
  const fetchCats = async () => {
    try {
      const cats = await repository.getList(currentPage);
      setCats((prevCats) => [...prevCats, ...cats]);
    } catch (err) {
      console.log("err", err);
      // @ts-ignore
      setError(err);
    }
  };
  const loadNextPage = async () => {
    setIsLoading(true);
    await fetchCats();
    setCurrentPage((prevPage) => prevPage + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      await loadNextPage();
    })();
  }, []);

  return { isLoading, cats, error, loadNextPage };
};
