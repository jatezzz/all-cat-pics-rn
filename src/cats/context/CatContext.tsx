import React, { createContext, ReactNode, useMemo } from "react";
import { CatAPIService } from "@/src/cats/service/CatAPIService";
import { CatLocalStorage } from "@/src/cats/service/CatLocalStorage";
import { CatRepository } from "@/src/cats/repository/CatRepository";

export interface CatContextType {
  repository: CatRepository;
}

// Use a function to lazily initialize the repository
// This avoids the instantiation cost if the context is never used
const defaultContextValue = () => ({
  repository: new CatRepository(new CatAPIService(), new CatLocalStorage())
});

export const CatContext = createContext<CatContextType>({ repository: defaultContextValue().repository });

interface CatProviderProps {
  children: ReactNode;
}

export const CatProvider: React.FC<CatProviderProps> = ({ children }) => {
  // useMemo will ensure the services and repository are only created once
  const value = useMemo(() => {
    const apiService = new CatAPIService();
    const localStorage = new CatLocalStorage();
    const repository = new CatRepository(apiService, localStorage);
    return { repository };
  }, []);

  return <CatContext.Provider value={value}>{children}</CatContext.Provider>;
};
