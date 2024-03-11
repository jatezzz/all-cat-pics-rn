import { Cat } from "../../types/Cat";

export interface CatLocalStorageProtocol {
  saveCats(cats: Cat[]): void;

  saveCat(cat: Cat): void;

  getCatById(id: string): Cat | undefined;
}

export interface CatAPIProtocol {
  fetchCatList(limit: number, skip: number): Promise<Cat[]>;

  fetchCatDetail(id: string): Promise<Cat>;
}

export interface CatRepositoryProtocol {
  getList(page: number): Promise<Cat[]>;

  getDetail(id: string): Promise<Cat>;
}
