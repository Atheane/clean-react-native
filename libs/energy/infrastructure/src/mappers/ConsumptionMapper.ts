import { IEnergyConsumption } from '@clean-rn/energy/domain';
import { IEnergyConsumptionDto } from '../dto';

export class ConsumptionMapper {
  static async toDomain(dto: IEnergyConsumptionDto[]): Promise<IEnergyConsumption[]> {
    if (!dto) {
      return [];
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return dto.map((conso: IEnergyConsumptionDto) => {
      const startDate = new Date(conso.startDate);
      const month = monthNames[startDate.getMonth()];
      const year = startDate.getFullYear();
      return {
        value: conso.value,
        year,
        month,
      };
    });
  }
}
