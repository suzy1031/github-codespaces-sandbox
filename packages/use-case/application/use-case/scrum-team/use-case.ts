import { EmployeeRepositoryInterface } from "../../../../core/src/company/employee";
import { ScrumTeamRepositoryInterface } from "../../../../core/src/scrum/team/scrum-team";
import {
  CreateScrumTeamCommand,
  DisbandScrumTeamCommand,
  EditScrumTeamCommand,
} from "./command";

export class ScrumTeamUseCase {
  constructor(
    private readonly scrumTeamRepository: ScrumTeamRepositoryInterface = new ScrumTeamRepository(),
    private readonly employeeRepository: EmployeeRepositoryInterface = new EmployeeRepository()
  ) {}

  async create(command: CreateScrumTeamCommand) {
    const { newProductOwner, newScrumMaster, developers } =
      await this.createScrumMembersFromCommand(command);

    const scrumTeamExists = await this.scrumTeamRepository.exists();
    if (scrumTeamExists) {
      throw new Error("ScrumTeam already exists");
    }

    const count = await this.employeeRepository.count();
    if (count <= 1) {
      throw new Error("Employee is not enough");
    }

    const newScrumTeam = ScrumTeam.createNew(
      newProductOwner,
      newScrumMaster,
      developers
    );
    await this.scrumTeamRepository.save(newScrumTeam);
  }

  async edit(command: EditScrumTeamCommand) {
    const { newProductOwner, newScrumMaster, developers } =
      await this.createScrumMembersFromCommand(command);

    const prevScrumTeam = await this.scrumTeamRepository.fetchOrFail();
    const newScrumTeam = prevScrumTeam
      .changeProductOwner(newProductOwner)
      .changeScrumMaster(newScrumMaster)
      .changeDevelopers(developers);
    await this.scrumTeamRepository.update(newScrumTeam);
  }

  async disband(command: DisbandScrumTeamCommand) {
    const scrumTeamId = command.getScrumTeamId();
    const scrumTeam = await this.scrumTeamRepository.fetchOrFail();

    if (!scrumTeam.id.equals(scrumTeamId)) {
      throw new Error("ScrumTeamId is not matched");
    }

    await this.scrumTeamRepository.delete();
  }

  private async createScrumMembersFromCommand(
    command: CreateScrumTeamCommand | EditScrumTeamCommand
  ) {
    const newProductOwnerId = command.getProductOwnerId();
    const newScrumMasterId = command.getScrumMasterId();
    if (newProductOwnerId.equals(newScrumMasterId)) {
      throw new Error("ProductOwner and ScrumMaster cannot be the same");
    }
    const developerIds = command.getDeveloperIds();

    const productOwnerEmployee = await this.employeeRepository.findByIdOrFail(
      newProductOwnerId
    );
    const newProductOwner =
      ProductOwner.createFromEmployee(productOwnerEmployee);

    const scrumMasterEmployee = await this.employeeRepository.findByIdOrFail(
      newScrumMasterId
    );
    const newScrumMaster = ScrumMaster.createFromEmployee(scrumMasterEmployee);
    const developers = [];
    for (const developerId of developerIds) {
      const developerEmployee = await this.employeeRepository.findByIdOrFail(
        developerId
      );
      const developer = Developer.createFromEmployee(developerEmployee);
      developers.push(developer);
    }

    return { newProductOwner, newScrumMaster, developers };
  }
}
