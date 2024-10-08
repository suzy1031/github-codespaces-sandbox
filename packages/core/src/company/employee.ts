import { Id } from "../common/id";

export class EmployeeId extends Id {
  constructor(public readonly value: number | null) {
    super(value);
  }

  static createAsNull() {
    return new EmployeeId(null);
  }

  equals(id: EmployeeId) {
    return this.value === id.value;
  }
}

export class EmployeeName {
  constructor(
    public readonly firstName: string,
    public readonly familyName: string
  ) {}

  static createFromString(name: string) {
    if (!name.includes(" ")) {
      throw new Error("社員名は姓名を半角スペースで区切ってください");
    }

    const [familyName, ...rest] = name.split(" ");

    return new EmployeeName(rest.join(" "), familyName);
  }
}

export class Employee {
  constructor(
    public readonly id: EmployeeId,
    public readonly employeeName: EmployeeName
  ) {}

  updateName(name: EmployeeName) {
    return new Employee(this.id, name);
  }
}

// crud操作
export interface EmployeeRepositoryInterface {
  findByIdOrFail(id: EmployeeId): Promise<Employee>;
  findAll(): Promise<Employee[]>;
  count(): Promise<number>;
  save(employee: Employee): Promise<Employee>;
  update(employee: Employee): Promise<Employee>;
  delete(employee: Employee): Promise<void>;
}

export class Member {
  constructor(public readonly employee: Employee) {}

  static createFromEmployee(employee: Employee) {
    return new Member(employee);
  }
}
