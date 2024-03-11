import { Cat } from "../types/Cat";

export interface ICatLocalStorage {
  saveCats(cats: Cat[]): void;

  saveCat(cat: Cat): void;

  getCatById(id: string): Cat | undefined;
}

export interface ICatAPI {
  fetchCatList(limit: number, skip: number): Promise<Cat[]>;

  fetchCatDetail(id: string): Promise<Cat>;
}

export interface ICatRepository {
  getList(page: number): Promise<Cat[]>;

  getDetail(id: string): Promise<Cat>;
}
