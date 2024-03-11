import {
  CatAPIProtocol,
  CatLocalStorageProtocol,
  CatRepositoryProtocol
} from "../../services/cats/CatLocalStorageProtocol";
import { Cat } from "../../types/Cat";
import { generateName } from "../../utils/generateName";

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
    let workingCats = cats.map(cat => {
      let modifiableCat = cat;
      modifiableCat.displayName = generateName(cat.id);
      return modifiableCat;
    });
    this.localStorage.saveCats(workingCats);
    return cats;
  }

  async getDetail(id: string): Promise<Cat> {
    let cat = this.localStorage.getCatById(id);
    if (!cat) {
      cat = await this.api.fetchCatDetail(id);
      let modifiableCat = cat;
      modifiableCat.displayName = generateName(cat.id);
      this.localStorage.saveCat(modifiableCat);
    }
    return cat;
  }
}
