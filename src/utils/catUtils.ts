import { Cat } from "../types/Cat";

export function fromJsonToCat(json: any): Cat {
  return new Cat({
    ...json,
    id: json._id
  });
}

export function fromJsonArrayToCat(json: any[]): Cat[] {
  return json.map(individual => fromJsonToCat(individual));
}
