import { Id } from "../../common/id";

export const ProductGoalStatus = {
  WIP: "wip",
  Ongoing: "ongoing",
  Done: "done",
  Aborted: "aborted",
} as const;
export type ProductGoalStatusType =
  (typeof ProductGoalStatus)[keyof typeof ProductGoalStatus];

export interface Commitment {}

export class ProductGoal implements Commitment {
  constructor(
    public readonly goal: string,
    public readonly status: ProductGoalStatusType
  ) {}
}

export class InvalidProductNameError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ProductId extends Id {
  constructor(public readonly value: number | null) {
    super(value);
  }

  static createAsNull() {
    return new ProductId(null);
  }

  equals(id: ProductId) {
    return this.value === id.value;
  }
}

export class ProductName {
  constructor(public readonly value: string) {
    this.validate();
  }

  private validate() {
    if (this.value.length < 1) {
      throw new InvalidProductNameError("1文字以上入力してください");
    }
  }
}

export class Product {
  constructor(
    public readonly id: ProductId,
    public readonly name: ProductName
  ) {}
}

export interface ProductRepositoryInterface {
  fetch(): Promise<Product | null>;
  findByNameOrFail(name: ProductName): Promise<Product>;
  existsWithoutId(): Promise<boolean>; // CLI でしか使わないメソッドかも
  save(product: Product): Promise<Product>;
}
