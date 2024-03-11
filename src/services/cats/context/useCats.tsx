import { useContext } from "react";

import { CatContext, CatContextType } from "./CatContext";

export const useCats = (): CatContextType => {
  return useContext(CatContext);
};
