import { Cat } from "../../../types/Cat";
import CatAPIEndpoints from "../../../config/CatAPIEndpoints";
import { CatAPIProtocol } from "../types/cats.service.types";
import { fromJsonArrayToCat, fromJsonToCat } from "../../../utils/catUtils";

export class CatAPIService implements CatAPIProtocol {
  async fetchCatList(limit: number = 10, skip: number = 0): Promise<Cat[]> {
    try {
      const response = await fetch(CatAPIEndpoints.catList(limit, skip));
      if (!response.ok) throw new Error(response.statusText);
      return fromJsonArrayToCat(await response.json());
    } catch (error) {
      throw error;
    }
  }

  async fetchCatDetail(id: string): Promise<Cat> {
    try {
      const response = await fetch(CatAPIEndpoints.catDetail(id));
      if (!response.ok) throw new Error(response.statusText);
      return fromJsonToCat(await response.json());
    } catch (error) {
      throw error;
    }
  }
}
