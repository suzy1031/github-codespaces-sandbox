import { Id } from "../../common/id";
import { Member } from "../../company/employee";

// ドメイン層 (The Clean Architecture Entities)
// 同じパッケージ内の common（ID 管理のため）と company（社員管理のため）にしか依存しておらず、core パッケージ内で完結しています。これはドメイン層が独立している
// ドメイン層は、Java が POJO（Plain Old Java Object） と言ったり PHP が POPO（Plain Old PHP Object） と呼んでいるもので表現
export const ScrumMemberRole = {
  ProductOwner: "product_owner",
  ScrumMaster: "scrum_master",
  Developer: "developer",
} as const;

export type ScrumMemberRoleType =
  (typeof ScrumMemberRole)[keyof typeof ScrumMemberRole];

export class ScrumTeamId extends Id {
  constructor(public readonly value: number | null) {
    super(value);
  }

  static createNull() {
    return new ScrumTeamId(null);
  }

  equals(id: ScrumTeamId) {
    return this.value === id.value;
  }
}

export class ScrumTeam {
  constructor(
    public readonly id: ScrumTeamId,
    public readonly productOwner: ProductOwner,
    public readonly scrumMaster: ScrumMaster,
    public readonly developers: Developer[]
  ) {}
}

export interface ScrumTeamRepositoryInterface {
  fetchOrFail(): Promise<ScrumTeam>;
  exists(): Promise<boolean>;
  save(scrumTeam: ScrumTeam): Promise<void>;
  update(scrumTeam: ScrumTeam): Promise<void>;
  delete(): Promise<void>;
}

export class ProductOwner {
  constructor(
    public readonly roles: ScrumMemberRoleType[],
    public readonly member: Member
  ) {
    // インスタンス作るときに、事前にバリデーションメソッドを呼ぶ
    this.validate();
  }

  private validate() {
    if (this.roles.includes(ScrumMemberRole.ScrumMaster)) {
      throw new Error("ProductOwner cannot be ScrumMaster");
    }
    if (!this.roles.includes(ScrumMemberRole.ProductOwner)) {
      throw new Error("ProductOwner must have ProductOwner role");
    }
  }
}

export class ScrumMaster {
  constructor(
    public readonly roles: ScrumMemberRoleType[],
    public readonly member: Member
  ) {
    // インスタンス作るときに、事前にバリデーションメソッドを呼ぶ
    this.validate();
  }

  private validate() {
    if (this.roles.includes(ScrumMemberRole.ProductOwner)) {
      throw new Error("ScrumMaster cannot be ProductOwner");
    }
    if (!this.roles.includes(ScrumMemberRole.ScrumMaster)) {
      throw new Error("ScrumMaster must have ProductOwner role");
    }
  }
}

export class Developer {
  public readonly role: ScrumMemberRoleType = ScrumMemberRole.Developer;

  constructor(public readonly member: Member) {}
}
