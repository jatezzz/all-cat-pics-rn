import React, { createContext, ReactNode } from "react";
import { CatAPIService } from "../service/CatAPIService";
import { CatLocalStorage } from "../service/CatLocalStorage";
import { CatRepository } from "../repository/CatRepository";

export interface CatContextType {
  repository: CatRepository;
}

export const CatContext = createContext<CatContextType>({ repository: new CatRepository(new CatAPIService(), new CatLocalStorage()) });

interface CatProviderProps {
  children: ReactNode;
}

export const CatProvider: React.FC<CatProviderProps> = ({ children }) => {
  const apiService = new CatAPIService();
  const localStorage = new CatLocalStorage();
  const repository = new CatRepository(apiService, localStorage);

  return (
    <CatContext.Provider value={{ repository }}>
      {children}
    </CatContext.Provider>
  );
};
