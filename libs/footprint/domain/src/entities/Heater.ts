import { Entity } from '@clean-rn/ddd';
import { IAddHeaterCommand } from '../commands';
import { HeaterVO } from '../value-objects';

export class Heater extends Entity<HeaterVO> {
  private constructor({ id, properties }: { id: string } & { properties: Partial<HeaterVO> }) {
    super({ id, properties });
  }

  static Create({ heaterId, heater }: { heaterId: string } & Pick<IAddHeaterCommand, 'heater'>): Heater {
    return new Heater({
      id: heaterId.toString(),
      properties: {
        ...heater.value,
      },
    });
  }
}
