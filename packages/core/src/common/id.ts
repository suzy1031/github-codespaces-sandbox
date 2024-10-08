export abstract class Id {
  constructor(public readonly value: number | null) {}

  toInt(): number {
    if (this.value === null) {
      throw new Error("値がnullです");
    }
    return this.value;
  }
}
