import { useCallback, useEffect, useState } from 'react';
import { HouseHeaterE as HeaterE, HouseYearE as YearE, HouseT, HouseE } from '@bank/carbon-weight/dist';

import { Logger } from '@clean-rn/logger';
import { HouseEmissions } from '@clean-rn/carbon/domain';

export const useHouseFormData = () => {
  const [formData, setFormData] = useState<Partial<HouseT & { consumption: number }>>();
  const [disabled, setDisabled] = useState(true);

  const resetFormData = useCallback((value: HeaterE) => {
    const newFormData = {
      heater: value,
      type: HouseE.house,
    };
    // setting formDefaultValues
    if ([HeaterE.coal, HeaterE.fuelOil, HeaterE.propane].includes(value)) {
      setFormData({
        ...newFormData,
        consumption: 5000,
      });
    } else if (value === HeaterE.gas) {
      setFormData({
        ...newFormData,
        surface: 60,
        built: YearE.recent,
      });
    } else {
      setFormData({
        ...newFormData,
        consumption: 0,
      });
    }
  }, []);

  const handleFormData = useCallback((key: keyof HouseT | 'consumption', value: YearE | number) => {
    setFormData((formData) => ({ ...formData, [key]: value }));
  }, []);

  useEffect(() => {
    try {
      new HouseEmissions(formData as HouseT & { consumption: number });
      setDisabled(false);
    } catch (e: unknown) {
      Logger.getInstance().debug(e);
    }
  }, [formData]);

  return { disabled, formData, resetFormData, handleFormData };
};
