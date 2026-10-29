import { House } from '@clean-rn/carbon/domain';
import { ICreateHouseCommand } from '@clean-rn/carbon/domain';
import { HeaterMapper } from '../mappers';
import { IHouseDto, ICreateHouseDto } from '../dtos';

export class HouseMapper {
  static async toDomain(dto: IHouseDto): Promise<House> {
    const house = House.Create({
      houseId: dto.houseId.toString(),
      houseStatus: dto.houseStatus,
    });
    if (dto.heaters) {
      dto.heaters.forEach(async (heaterDto) => {
        const heater = await HeaterMapper.toDomain(heaterDto);
        house.addHeater(heater);
      });
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
