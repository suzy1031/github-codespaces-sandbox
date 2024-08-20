export type Database = Documents;

export const createDefaultData = (): Database => ({
  products: [],
  projects: [],
  employees: [],
  members: [],
  scrumMemberRoles: {
    1: "product_owner",
    2: "scrum_master",
    3: "developer",
  },
  scrumTeams: [],
  productOwners: [],
  scrumMasters: [],
  developers: [],
});

export type Documents = {
  products: ProductsSchema;
  projects: ProjectsSchema;
  employees: EmployeesSchema;
  members: MembersSchema;
  scrumMemberRoles: ScrumMemberRolesSchema;
  scrumTeams: ScrumTeamsSchema;
  productOwners: ProductOwnersSchema;
  scrumMasters: ScrumMastersSchema;
  developers: DevelopersSchema;
};

export type ProductsSchema = {
  id: number;
  name: string;
}[];

export type ProjectsSchema = {
  id: number;
  name: string;
}[];

export type EmployeesSchema = {
  id: number;
  first_name: string;
  family_name: string;
}[];

export type MembersSchema = {
  employee_id: number;
}[];

export type ScrumMemberRolesSchema = {
  1: "product_owner";
  2: "scrum_master";
  3: "developer";
};

export type ScrumTeamsSchema = {
  id: number;
}[];

export type ProductOwnersSchema = {
  scrum_team_id: number;
  employee_id: number;
}[];

export type ScrumMastersSchema = {
  scrum_team_id: number;
  employee_id: number;
}[];

export type DevelopersSchema = {
  scrum_team_id: number;
  employee_id: number;
}[];
