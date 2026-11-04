import { Entity } from '@clean-rn/ddd';
import { WorkVO } from '../value-objects';

export class Work extends Entity<WorkVO> {
  private constructor({ id, properties }: { id: string } & { properties: Partial<WorkVO> }) {
    super({ id, properties });
  }

  static Create({ workId, work }: { workId: string; work: WorkVO }): Work {
    return new Work({
      id: workId.toString(),
      properties: {
        ...work.value,
      },
    });
  }
}
