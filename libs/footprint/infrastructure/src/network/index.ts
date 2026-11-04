import { HttpConnection, IHttpVerb, ServerError } from '@clean-rn/shared/infrastructure';
import {
  // footprint
  IFootprintRepository,
  IFootprintService,
  ICreateFootprintCommand,
  Footprint,
  FootprintError,
  // house
  ICreateHouseCommand,
  ISearchHouseQuery,
  House,
  IAddHeaterCommand,
  IAddHeatersCommand,
  Heater,
  HeaterVO,
  IAddWorkCommand,
  IAddWorksCommand,
  Work,
  WorkVO,
  // transport
  ICreateTransportCommand,
  ISearchTransportQuery,
  IAddVehiclesCommand,
  IAddVehicleCommand,
  Transport,
  Vehicle,
  VehicleVO,
  HouseholdVO,
} from '@clean-rn/footprint/domain';
import { IFootprintDto, IHeaterDto, IHouseDto, IVehicleDto, IWorkDto } from '../dtos';
import { FootprintMapper, HouseMapper, HeaterMapper, WorkMapper, VehicleMapper } from '../mappers';

export class FootprintApi implements IFootprintRepository, IFootprintService {
  private static instance: FootprintApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    // footprint
    this.getFootprint = this.getFootprint.bind(this);
    this.createFootprint = this.createFootprint.bind(this);
    // house
    this.createHouse = this.createHouse.bind(this);
    this.searchHouse = this.searchHouse.bind(this);
    this.addHeater = this.addHeater.bind(this);
    this.addHeaters = this.addHeaters.bind(this);
    this.addWork = this.addWork.bind(this);
    this.addWorks = this.addWorks.bind(this);
    // transport
    this.createTransport = this.createTransport.bind(this);
    this.searchTransport = this.searchTransport.bind(this);
    this.addVehicle = this.addVehicle.bind(this);
    this.addVehicles = this.addVehicles.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(httpConnection: HttpConnection): FootprintApi {
    if (!this.instance) {
      this.instance = new FootprintApi(httpConnection);
    }
    return this.instance;
  }

  // footprint
  async getFootprint(): Promise<Footprint | void> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/footprint`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const footprintsDto: IFootprintDto[] = await response.json();
    if (footprintsDto.length === 0) {
      return;
    }
    const currentYear = new Date().getFullYear();
    // find footprint for current year
    const currentFootprintDto = footprintsDto.find(
      (footprint: IFootprintDto) => new Date(footprint.startDate).getFullYear() === currentYear,
    );
    if (!currentFootprintDto) {
      return;
    }
    const currentFootprint = await FootprintMapper.toDomain(currentFootprintDto);
    const otherFootprints: Footprint[] = await Promise.all(
      footprintsDto
        .filter(
          (footprintDto: IFootprintDto) => new Date(footprintDto.startDate).getFullYear() !== currentYear,
        )
        .map(async (footprintDto: IFootprintDto) => {
          const householdVO = await HouseholdVO.create(footprintDto);
          return Footprint.Create({
            household: householdVO,
            startDate: new Date(footprintDto.startDate),
            endDate: new Date(footprintDto.endDate),
            userId: footprintDto.userId.toString(),
            unit: footprintDto.unit,
          });
        }),
    );
    currentFootprint.addHistory(otherFootprints);
    return currentFootprint;
  }

  async createFootprint(cmd: ICreateFootprintCommand): Promise<Footprint> {
    try {
      const dto = FootprintMapper.toDto(cmd);

      const response = await fetch(
        `${this.connection.baseUrl}/app/footprint`,
        this.connection.options(IHttpVerb.POST, dto),
      );

      await this.connection.handleError(response);
      const footprintDto: IFootprintDto = await response.json();

      return FootprintMapper.toDomain(footprintDto);
    } catch (error: ServerError | unknown) {
      if (error instanceof ServerError && error.statusCode === 400) {
        throw new FootprintError.HouseAlreadyDeclared();
      }
      throw error;
    }
  }

  // house
  async createHouse(cmd: ICreateHouseCommand): Promise<House> {
    const dto = HouseMapper.toDto(cmd);

    const response = await fetch(
      `${this.connection.baseUrl}/app/footprint/house`,
      this.connection.options(IHttpVerb.POST, dto),
    );
    await this.connection.handleError(response);
    const houseDto: IHouseDto = await response.json();
    return HouseMapper.toDomain(houseDto);
  }

  async searchHouse(query: ISearchHouseQuery): Promise<House | void> {
    const url = `${this.connection.baseUrl}/app/footprint/house?` + new URLSearchParams(query);

    const response = await fetch(url, this.connection.options(IHttpVerb.GET));
    await this.connection.handleError(response);
    const houseDtos: IHouseDto[] = await response.json();
    if (houseDtos.length === 0) {
      return;
    }
    const houseDto = houseDtos[0];
    return HouseMapper.toDomain(houseDto);
  }

  async addHeater({ houseId, heaterVO }: IAddHeaterCommand): Promise<Heater> {
    const dto = HeaterMapper.toDto(heaterVO);
    const response = await fetch(
      `${this.connection.baseUrl}/app/footprint/house/${houseId}/heater`,
      this.connection.options(IHttpVerb.POST, dto),
    );
    await this.connection.handleError(response);
    const houseDto: IHouseDto = await response.json();
    const heaterDto: IHeaterDto = houseDto.heaters[houseDto.heaters.length - 1];
    return HeaterMapper.toDomain(heaterDto);
  }

  async addHeaters(cmd: IAddHeatersCommand): Promise<House> {
    const addHeaterPromises = cmd.heatersVO.map((heaterVO: HeaterVO) =>
      this.addHeater({ houseId: cmd.house.id, heaterVO }),
    );
    const heaters: Heater[] = await Promise.all(addHeaterPromises);
    const house = cmd.house;
    house.addHeaters(heaters);
    return house;
  }

  async addWork({ houseId, workVO }: IAddWorkCommand): Promise<Work> {
    const dto = WorkMapper.toDto(workVO);
    const response = await fetch(
      `${this.connection.baseUrl}/app/footprint/house/${houseId}/work`,
      this.connection.options(IHttpVerb.POST, dto),
    );
    await this.connection.handleError(response);
    const houseDto: IHouseDto = await response.json();
    const workDto: IWorkDto = houseDto.works[houseDto.works.length - 1];
    return WorkMapper.toDomain(workDto);
  }

  async addWorks(cmd: IAddWorksCommand): Promise<House> {
    if (cmd.worksVO.length === 0) {
      const response = await fetch(
        `${this.connection.baseUrl}/app/footprint/house/${cmd.house.id}/no-work`,
        this.connection.options(IHttpVerb.PUT),
      );
      await this.connection.handleError(response);
      const houseDto: IHouseDto = await response.json();
      return HouseMapper.toDomain(houseDto);
    } else {
      const addWorkPromises = cmd.worksVO.map((workVO: WorkVO) =>
        this.addWork({ houseId: cmd.house.id, workVO }),
      );
      const works: Work[] = await Promise.all(addWorkPromises);
      const house = cmd.house;
      house.addWorks(works);
      return house;
    }
  }

  // transport
  async createTransport(cmd: ICreateTransportCommand): Promise<Transport> {
    // todo back-end: implement the service
    return Transport.Create({ transportId: cmd.userId });
  }

  async searchTransport(query: ISearchTransportQuery): Promise<Transport | void> {
    const url = `${this.connection.baseUrl}/app/footprint/vehicle?` + new URLSearchParams(query);
    const response = await fetch(url, this.connection.options(IHttpVerb.GET));
    await this.connection.handleError(response);
    const vehiclesDtos: IVehicleDto[] = await response.json();
    if (vehiclesDtos.length === 0) {
      return;
    }
    const vehicles: Vehicle[] = await Promise.all(
      vehiclesDtos.map((vehicleDto: IVehicleDto) => VehicleMapper.toDomain(vehicleDto)),
    );
    const transport = Transport.Create({ transportId: query.userId });
    transport.addVehicles(vehicles);
    return transport;
  }

  async addVehicle(cmd: IAddVehicleCommand): Promise<Vehicle> {
    try {
      const dto = VehicleMapper.toDto(cmd.vehicleVO);
      const response = await fetch(
        `${this.connection.baseUrl}/app/footprint/vehicle`,
        this.connection.options(IHttpVerb.POST, dto),
      );
      await this.connection.handleError(response);
      const vehicleDto: IVehicleDto = await response.json();
      return VehicleMapper.toDomain(vehicleDto);
    } catch (error: ServerError | unknown) {
      if (error instanceof ServerError && error.statusCode === 400) {
        throw new FootprintError.VehicleAlreadyExists();
      }
      throw error;
    }
  }

  async addVehicles(cmd: IAddVehiclesCommand): Promise<Transport> {
    const addVehiclePromises = cmd.vehiclesVO.map((vehicleVO: VehicleVO) => this.addVehicle({ vehicleVO }));
    const vehicles: Vehicle[] = await Promise.all(addVehiclePromises);
    const transport = cmd.transport;
    transport.addVehicles(vehicles);
    return transport;
  }
}
