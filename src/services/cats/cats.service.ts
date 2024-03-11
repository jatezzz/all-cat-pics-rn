import { CONSTANTS } from "../../config/constants";
import { Cat } from "../../types/Cat";
import CatAPIEndpoints from "./CatAPIEndpoints";

const { API } = CONSTANTS;
const { API_URL } = API;


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
    id: json._id // Manually map _id to id
    // Assume other properties match by name and are directly assignable
  });
}

export function fromJsonArrayToCat(json: any[]): Cat[] {
  return json.map(individual => fromJsonToCat(individual));
}
