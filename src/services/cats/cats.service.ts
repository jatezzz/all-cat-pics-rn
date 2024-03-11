import { CONSTANTS } from "../../config/constants";

const { API } = CONSTANTS;
const { API_URL } = API;


export const getExternalCats = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/api/cats?limit=10&skip=0`);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};
