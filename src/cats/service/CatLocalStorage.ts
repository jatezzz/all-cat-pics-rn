import { Cat } from "../../types/Cat";
import { ICatLocalStorage } from "../catTypes";

export class CatLocalStorage implements ICatLocalStorage {
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
