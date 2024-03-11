import { Cat } from "../../types/Cat";
import CatAPIEndpoints from "../../config/CatAPIEndpoints";


export const getExternalCats = async (limit: number = 10, skip: number = 0): Promise<Cat[]> => {
  try {
    const response = await fetch(CatAPIEndpoints.catList(limit, skip));
    if (!response.ok) throw new Error(response.statusText);
    return fromJsonArrayToCat(await response.json());
  } catch (error) {
    throw error;
  }
};

export function fromJsonToCat(json: any): Cat {
  console.log("fromJsonToCat", json);
  return new Cat({
    ...json,
    id: json._id
  });
}

export function fromJsonArrayToCat(json: any[]): Cat[] {
  return json.map(individual => fromJsonToCat(individual));
}
