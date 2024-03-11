export default class CatAPIEndpoints {
  private static base = "https://cataas.com";

  static catList(limit: number, skip: number): string {
    return `${this.base}/api/cats?limit=${limit}&skip=${skip}`;
  }

  static catDetail(id: string): string {
    return `${this.base}/cat/${id}?json=true`;
  }

  static catImageURL(id: string): string {
    return `${this.base}/cat/${id}`;
  }

  static catSaysImageURL(id: string, text: string): string {
    const encodedText = encodeURIComponent(text);
    return `${this.base}/cat/${id}/says/${encodedText}?fontSize=50&fontColor=white`;
  }

}
