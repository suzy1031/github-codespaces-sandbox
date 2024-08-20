import {
  Employee,
  EmployeeId,
  EmployeeName,
  EmployeeRepositoryInterface,
} from "../../../../core/src/company/employee";
import { db } from "../../../external/lowdb/database";
import { Database } from "../../../external/lowdb/schema";
import { JsonRepository } from "./json-repository";
import { Low } from "lowdb";
import { EmployeesSchema } from "../../../external/lowdb/schema";

export class EmployeeRepository
  extends JsonRepository
  implements EmployeeRepositoryInterface
{
  constructor(private readonly lowdb: Low<Database> = db) {
    super();
  }

  private nextId(): EmployeeId {
    return new EmployeeId(this.calculateNewId(this.lowdb.data.employees));
  }

  async findByIdOrFail(id: EmployeeId): Promise<Employee> {
    await this.lowdb.read();
    const { employees } = this.lowdb.data;
    const employee = employees.find((v) => v.id === id.value);
    if (!employee) {
      throw new Error(`EmployeeId(${id.value}) not found`);
    }
    return this.mapToEmployee(employee);
  }

  private mapToEmployee(record: EmployeesSchema[number]): Employee {
    return new Employee(
      new EmployeeId(record.id),
      new EmployeeName(record.first_name, record.family_name)
    );
  }
}
