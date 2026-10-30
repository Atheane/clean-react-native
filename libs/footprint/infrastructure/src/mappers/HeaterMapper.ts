import { Heater, HeaterVO, IAddHeaterCommand } from '@clean-rn/footprint/domain';
import { IHeaterDto, IAddHeaterDto } from '../dtos';

export class HeaterMapper {
  static async toDomain({ heaterId, ...heaterProps }: IHeaterDto): Promise<Heater> {
    const heaterVO = await HeaterVO.create({
      ...heaterProps,
    });
    return Heater.Create({
      heaterId: heaterId.toString(),
      heater: heaterVO,
    });
  }

  static toDto(command: IAddHeaterCommand): IAddHeaterDto {
    return {
      ...command.heater.value,
    };
  }
}
