import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import {
  HeaterVO,
  IAddHeaterCommand,
  IAddHeatersCommand,
  IFootprintRepository,
  IFootprintService,
  ICreateHouseCommand,
  ISearchHouseQuery,
} from '@clean-rn/footprint/domain';
import { House } from '@clean-rn/footprint/domain';
import { IHouseDto } from '../dtos';
import { HouseMapper, HeaterMapper } from '../mappers';

export class FootprintApi implements IFootprintRepository, IFootprintService {
  private static instance: FootprintApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.searchHouse = this.searchHouse.bind(this);
    this.createHouse = this.createHouse.bind(this);
    this.addHeater = this.addHeater.bind(this);
    this.addHeaters = this.addHeaters.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(httpConnection: HttpConnection): FootprintApi {
    if (!this.instance) {
      this.instance = new FootprintApi(httpConnection);
    }
    return this.instance;
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

  async addHeater({ house, heater }: IAddHeaterCommand): Promise<House> {
    const dto = HeaterMapper.toDto({ house, heater });
    const response = await fetch(
      `${this.connection.baseUrl}/app/footprint/house/${house.id}/heater`,
      this.connection.options(IHttpVerb.POST, dto),
    );
    await this.connection.handleError(response);
    const houseDto: IHouseDto = await response.json();
    return HouseMapper.toDomain(houseDto);
  }

  async addHeaters(cmd: IAddHeatersCommand): Promise<House> {
    const addHeaterPromises = cmd.heaters.map((heater: HeaterVO) =>
      this.addHeater({ house: cmd.house, heater }),
    );
    const results: House[] = await Promise.all(addHeaterPromises);
    return results[results.length - 1];
  }
}
