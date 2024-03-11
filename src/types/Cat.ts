export interface ICat {
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  mimetype?: string;
  size?: number;
  id: string;
  editedAt?: string;
}

export class Cat implements ICat {
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  mimetype?: string;
  size?: number;
  id: string;
  editedAt?: string;

  displayName: string = "no-name";

  constructor(data: ICat) {
    this.tags = data.tags;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.mimetype = data.mimetype;
    this.size = data.size;
    this.id = data.id;
    this.editedAt = data.editedAt;
  }

  get updatedDate(): string | undefined {
    return this.updatedAt || this.editedAt;
  }

  get validTags(): string[] {
    return this.tags.filter(tag => tag !== "");
  }
}
