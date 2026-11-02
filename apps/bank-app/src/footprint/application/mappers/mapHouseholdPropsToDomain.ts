import { HouseholdVO } from '@clean-rn/footprint/domain';
import { IHouseholdProps } from '../../presentation/types';

export const mapHouseholdPropsToDomain = async (props: IHouseholdProps): Promise<HouseholdVO> => {
  const household: HouseholdVO = await HouseholdVO.create({
    adultNumber: props.adultNumber,
    childNumber: props.childNumber,
  });

  return household;
};
