import {
  CatAPIProtocol,
  CatLocalStorageProtocol,
  CatRepositoryProtocol
} from "../../services/cats/CatLocalStorageProtocol";
import { Cat } from "../../types/Cat";

export class CatRepository implements CatRepositoryProtocol {
  private api: CatAPIProtocol;
  private localStorage: CatLocalStorageProtocol;
  private itemsPerPage = 10;

  constructor(api: CatAPIProtocol, localStorage: CatLocalStorageProtocol) {
    this.api = api;
    this.localStorage = localStorage;
  }

  async getList(page: number = 0): Promise<Cat[]> {
    const cats = await this.api.fetchCatList(this.itemsPerPage, page * this.itemsPerPage);
    // Assume API directly returns Cat array for simplicity
    // Modify cats if necessary before saving
    this.localStorage.saveCats(cats);
    return cats;
  }

  async getDetail(id: string): Promise<Cat> {
    let cat = this.localStorage.getCatById(id);
    if (!cat) {
      cat = await this.api.fetchCatDetail(id);
      // Modify cat if necessary before saving
      this.localStorage.saveCat(cat);
    }
    return cat;
  }
}
