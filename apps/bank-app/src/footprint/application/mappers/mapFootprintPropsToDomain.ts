import { FootprintVO } from '@clean-rn/footprint/domain';
import { IFootprintProps } from '../../presentation/types';

export const mapFootprintPropsToDomain = async (props: IFootprintProps): Promise<FootprintVO> => {
  const footprint: FootprintVO = await FootprintVO.create({
    adultNumber: props.adultNumber,
    childNumber: props.childNumber,
  });

  return footprint;
};
