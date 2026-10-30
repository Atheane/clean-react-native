import { useCallback, useEffect, useState } from 'react';
import { FoodConsumptionT } from '@bank/carbon-weight/dist';
import { FoodEmissions } from '@clean-rn/footprint/domain';

type IFood = {
  alcohol: number;
  bread: number;
  cheese: number;
  fish: number;
  harvestExotic: number;
  harvestLocal: number;
  meatRed: number;
  meatWhite: number;
  rice: number;
  soft: number;
};

export const useFoodFormData = (initialValues: FoodConsumptionT | null) => {
  const [formData, setFormData] = useState<FoodConsumptionT>(
    initialValues ?? {
      alcohol: 7,
      bread: 7,
      cheese: 7,
      fish: 7,
      harvestExotic: 7,
      harvestLocal: 7,
      meatRed: 7,
      meatWhite: 7,
      rice: 7,
      soft: 7,
    },
  );
  const [disabled, setDisabled] = useState(false);

  const handleFormData = useCallback((form: IFood) => {
    setFormData(form);
  }, []);

  useEffect(() => {
    try {
      new FoodEmissions(formData as IFood);
      setDisabled(false);
    } catch (e: unknown) {
      console.log(e);
    }
  }, [formData]);

  return { disabled, formData, handleFormData };
};
