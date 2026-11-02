import { Footprint, HouseholdVO, ICreateFootprintCommand } from '@clean-rn/footprint/domain';
import { ICreateFootprintDto, IFootprintDto } from '../dtos';

export class FootprintMapper {
  static async toDomain({
    userId,
    adultNumber,
    childNumber,
    ...footprintDto
  }: IFootprintDto): Promise<Footprint> {
    const householdVO = await HouseholdVO.create({
      adultNumber,
      childNumber,
    });
    const footprint = Footprint.Create({
      household: householdVO,
      userId: userId.toString(),
      startDate: new Date(footprintDto.startDate),
      endDate: new Date(footprintDto.endDate),
      unit: footprintDto.unit,
    });
    return footprint;
  }

  static toDto(command: ICreateFootprintCommand): ICreateFootprintDto {
    return {
      userId: command.userId.toString(),
      ...command.household.value,
    };
  }
}
