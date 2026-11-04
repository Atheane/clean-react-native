import {
  PRICE_COMFORT_DATA_GRANULARITY,
  PRICE_COMFORT_TYPE,
  PriceComfortVO,
} from '@clean-rn/energy/domain';
import { IPriceComfortDto, PRICE_COMFORT_DATA_GRANULARITY_DTO, PRICE_COMFORT_TYPE_DTO } from '../dto';

const mapPriceComfortType = (
  priceComfortTypeCode: PRICE_COMFORT_TYPE_DTO,
): PRICE_COMFORT_TYPE | undefined => {
  switch (priceComfortTypeCode) {
    case PRICE_COMFORT_TYPE_DTO.ALL:
      return PRICE_COMFORT_TYPE.ALL;
    case PRICE_COMFORT_TYPE_DTO.COOLING:
      return PRICE_COMFORT_TYPE.COOLING;
    case PRICE_COMFORT_TYPE_DTO.HEATING:
      return PRICE_COMFORT_TYPE.HEATING;
    default:
      return;
  }
};

const mapPriceComfortDataGranularity = (
  priceComfortDataGranularityCode: PRICE_COMFORT_DATA_GRANULARITY_DTO,
): PRICE_COMFORT_DATA_GRANULARITY | undefined => {
  switch (priceComfortDataGranularityCode) {
    case PRICE_COMFORT_DATA_GRANULARITY_DTO.DAILY:
      return PRICE_COMFORT_DATA_GRANULARITY.DAILY;
    case PRICE_COMFORT_DATA_GRANULARITY_DTO.INSTANT:
      return PRICE_COMFORT_DATA_GRANULARITY.INSTANT;
    case PRICE_COMFORT_DATA_GRANULARITY_DTO.MONTHLY:
      return PRICE_COMFORT_DATA_GRANULARITY.MONTHLY;
    default:
      return;
  }
};

export class PriceComfortMapper {
  static async toDomain(dto: IPriceComfortDto): Promise<PriceComfortVO> {
    const type = mapPriceComfortType(dto.comfortPriceType as PRICE_COMFORT_TYPE_DTO);
    const granularity = mapPriceComfortDataGranularity(
      dto.dataGranularity as PRICE_COMFORT_DATA_GRANULARITY_DTO,
    );
    const priceComfortProps: Partial<PriceComfortVO> = {
      type,
      granularity,
      intercept: dto.intercept,
      slope: dto.value,
      startDate: dto.startDate,
      endDate: dto.endDate,
      temperature: dto.temperature,
    };
    return PriceComfortVO.create(priceComfortProps);
  }
}
