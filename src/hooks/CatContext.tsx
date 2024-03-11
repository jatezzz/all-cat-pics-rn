// CatContext.js
import React, { createContext, ReactNode, useContext } from "react";
import { CatAPIService } from "../services/cats/CatAPIService";
import { CatLocalStorage } from "../services/cats/CatLocalStorage";
import { CatRepository } from "../services/cats/CatRepository";

// Assuming CatRepository is already typed, if not, define its interface
interface CatContextType {
  repository: CatRepository;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

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

export const useCats = (): CatContextType => {
  const context = useContext(CatContext);
  if (context === undefined) {
    throw new Error("useCats must be used within a CatProvider");
  }
  return context;
};
