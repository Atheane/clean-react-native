import { Heater, House, Work, ICreateHouseCommand } from '@clean-rn/footprint/domain';
import { HeaterMapper, WorkMapper } from '../mappers';
import { IHouseDto, ICreateHouseDto } from '../dtos';

export class HouseMapper {
  static async toDomain(dto: IHouseDto): Promise<House> {
    const house = House.Create({
      houseId: dto.houseId.toString(),
      houseStatus: dto.houseStatus,
    });
    if (dto.heaters) {
      dto.heaters.forEach(async (heaterDto, index) => {
        const heaters = [] as Heater[];
        const heater = await HeaterMapper.toDomain(heaterDto);
        heaters.push(heater);
        if (index === dto.heaters.length - 1) {
          house.addHeaters(heaters);
        }
      });
    }
    if (dto.works) {
      if (dto.works.length === 0) {
        house.addWorks([]); // if empty array for works from back-end, we know house has no works
      } else {
        dto.works.forEach(async (workDto, index) => {
          const works = [] as Work[];
          const work = await WorkMapper.toDomain(workDto);
          works.push(work);
          if (index === dto.works.length - 1) {
            house.addWorks(works);
          }
        });
      }
    }
    return house;
  }

  static toDto(command: ICreateHouseCommand): ICreateHouseDto {
    return {
      userId: command.userId,
      houseStatus: command.houseStatus,
    };
  }
}
