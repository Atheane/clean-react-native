import { useCallback, useEffect, useState } from 'react';
import { HouseHeaterE as HeaterE, HouseYearE as YearE, HouseT, HouseE } from '@bank/carbon-weight/dist';

import { Logger } from '@clean-rn/logger';
import { HouseEmissions } from '@clean-rn/carbon/domain';

export const useHouseFormData = (
  initialValues: (HouseT & { consumption: number } & { builtYear: number }) | null,
) => {
  const [formData, setFormData] =
    useState<Partial<HouseT & { consumption: number } & { builtYear: number }>>();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

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
        builtYear: 1980,
      });
    } else {
      setFormData({
        ...newFormData,
        consumption: 0,
      });
    }
  }, []);

  const handleFormData = useCallback(
    (key: keyof HouseT | 'consumption' | 'builtYear', value: YearE | number) => {
      setFormData((formData) => ({ ...formData, [key]: value }));
    },
    [],
  );

  useEffect(() => {
    try {
      new HouseEmissions(formData as HouseT & { consumption: number } & { builtYear: number });
      setDisabled(false);
    } catch (e: unknown) {
      Logger.getInstance().debug(e);
    }
  }, [formData]);

  return { disabled, formData, resetFormData, handleFormData };
};
