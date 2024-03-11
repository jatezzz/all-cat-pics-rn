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

function fromJsonToCat(json: any): Cat {
  console.log("fromJsonToCat", json);
  return new Cat({
    ...json,
    id: json._id // Manually map _id to id
    // Assume other properties match by name and are directly assignable
  });
}

function fromJsonArrayToCat(json: any[]): Cat[] {
  return json.map(individual => fromJsonToCat(individual));
}

class CatAPIService {
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
      const data: Cat = fromJsonToCat(await response.json());
      return data;
    } catch (error) {
      throw error;
    }
  }
}

