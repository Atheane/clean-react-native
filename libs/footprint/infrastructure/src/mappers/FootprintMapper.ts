import { Footprint, FootprintVO, ICreateFootprintCommand } from '@clean-rn/footprint/domain';
import { ICreateFootprintDto, IFootprintDto } from '../dtos';

export class FootprintMapper {
  static async toDomain({
    userId,
    adultNumber,
    childNumber,
    ...footprintDto
  }: IFootprintDto): Promise<Footprint> {
    const footprintVO = await FootprintVO.create({
      adultNumber,
      childNumber,
    });
    const footprint = Footprint.Create({
      footprint: footprintVO,
      userId: userId.toString(),
      startDate: new Date(footprintDto.startDate),
      endDate: new Date(footprintDto.endDate),
      unit: footprintDto.unit,
    });
    console.log(footprint);
    return footprint;
  }

  static toDto(command: ICreateFootprintCommand): ICreateFootprintDto {
    return {
      userId: command.userId.toString(),
      ...command.footprint.value,
    };
  }
}
