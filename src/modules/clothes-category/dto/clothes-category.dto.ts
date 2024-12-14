import { ClothesCategory } from "../../../entities/clothes-category.entity";

export class ClothesCategoryDto {
  public id: string;
  public name: string;
  public created_at: Date;
  public updated_at: Date;

  constructor(payload: ClothesCategory) {
    this.id = payload.id;
    this.name = payload.name;
    this.created_at = payload.created_at;
    this.updated_at = payload.updated_at;
  }
}
