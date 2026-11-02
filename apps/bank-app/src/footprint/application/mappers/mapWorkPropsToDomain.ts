import { FootprintError, HOUSE_WORK_TYPE, WorkVO } from '@clean-rn/footprint/domain';
import { IWorksProps } from '../../presentation/types';

export const mapWorkPropsToDomain = async (props: IWorksProps): Promise<WorkVO[]> => {
  if (props === undefined || props.worksType.length === 0) {
    return [];
  }

  if (!props.workDate) {
    throw new FootprintError.InvalidWorkDate();
  }

  const worksVO = await Promise.all(
    props.worksType.map(async (workType: HOUSE_WORK_TYPE) => {
      const workVO = await WorkVO.create({
        workDate: new Date(Date.UTC(props.workDate, 0, 1)).toISOString(),
        workType,
      });
      return workVO;
    }),
  );

  return worksVO;
};
