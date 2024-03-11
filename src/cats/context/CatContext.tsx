import React, { createContext, ReactNode, useMemo } from "react";
import { CatAPIService } from "../../cats/service/CatAPIService";
import { CatLocalStorage } from "../../cats/service/CatLocalStorage";
import { CatRepository } from "../../cats/repository/CatRepository";

export interface CatContextType {
  repository: CatRepository;
}
const defaultContextValue = () => ({
  repository: new CatRepository(new CatAPIService(), new CatLocalStorage())
});

export const CatContext = createContext<CatContextType>({ repository: defaultContextValue().repository });

interface CatProviderProps {
  children: ReactNode;
}

export const CatProvider: React.FC<CatProviderProps> = ({ children }) => {
  const value = useMemo(() => {
    const apiService = new CatAPIService();
    const localStorage = new CatLocalStorage();
    const repository = new CatRepository(apiService, localStorage);
    return { repository };
  }, []);

  return <CatContext.Provider value={value}>{children}</CatContext.Provider>;
};
