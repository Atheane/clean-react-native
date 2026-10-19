import { useCallback, useEffect, useState } from 'react';
import { VehicleFuelE as FuelE, VehicleConsumptionT } from '@bank/carbon-weight/dist';

import { Logger } from '@clean-rn/logger';
import { TransportEmissions } from '@clean-rn/carbon/domain';

export const useTransportFormData = (initialValues: VehicleConsumptionT | null) => {
  const [formData, setFormData] = useState<Partial<VehicleConsumptionT>>();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const resetFormData = useCallback((value: FuelE) => {
    const newFormData = {
      fuel: value,
    };
    // setting formDefaultValues
    if (value !== FuelE.electric) {
      setFormData({
        ...newFormData,
        mpg: 8,
        distanceByYear: 20000,
      });
    } else {
      setFormData({
        ...newFormData,
        mpg: 0,
        distanceByYear: 0,
      });
    }
  }, []);

  const handleFormData = useCallback((key: 'mpg' | 'distanceByYear', value: number) => {
    setFormData((formData) => ({ ...formData, [key]: value }));
  }, []);

  useEffect(() => {
    try {
      new TransportEmissions(formData as VehicleConsumptionT);
      setDisabled(false);
    } catch (e: unknown) {
      Logger.getInstance().debug(e);
    }
  }, [formData]);

  return { disabled, formData, resetFormData, handleFormData };
};
