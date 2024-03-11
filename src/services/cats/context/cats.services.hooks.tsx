import { useContext } from "react";

import { CatContext, CatContextType } from "./CatContext";

export const useCats = (): CatContextType => {
  const context = useContext(CatContext);
  if (context === undefined) {
    throw new Error("useCats must be used within a CatProvider");
  }
  return context;
};
