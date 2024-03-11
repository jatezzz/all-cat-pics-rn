import { Cat } from "../../../types/Cat";
import { CatLocalStorageProtocol } from "../types/cats.service.types";

export class CatLocalStorage implements CatLocalStorageProtocol {
  private allCats: Set<Cat> = new Set();

  saveCats(cats: Cat[]): void {
    cats.forEach(cat => this.allCats.add(cat));
  }

  saveCat(cat: Cat): void {
    this.allCats.add(cat);
  }

  getCatById(id: string): Cat | undefined {
    return Array.from(this.allCats).find(cat => cat.id === id);
  }
}
