import { IsNotEmpty, IsNumberString } from "class-validator";

export class PaginationResponse<T> {
  constructor(
    public items: T,
    public pagination: Pagination,
  ) {}
}

export class Pagination {
  public total_item: number;
  public total_page: number;
  public current_page: number;

  constructor(dataLength: number, payload: PaginationParams) {
    const { page, limit } = payload;
    this.total_item = Number(dataLength);
    this.total_page = dataLength !== 0 ? Math.ceil(dataLength / limit) : 1;
    this.current_page = Number(page);
  }
}

export class PaginationParams {
  @IsNotEmpty()
  @IsNumberString()
  public page: number;

  @IsNotEmpty()
  @IsNumberString()
  public limit: number;
}
