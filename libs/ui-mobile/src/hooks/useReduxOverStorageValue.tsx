/*  eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export const useReduxOverStorageValue = (valueFromStorage: any, valueFromRedux: any) => {
  const [value, setValue] = useState();
  useEffect(() => {
    if (valueFromRedux !== null) {
      setValue(valueFromRedux);
    } else if (valueFromStorage !== null) {
      setValue(valueFromStorage);
    }
  }, [valueFromStorage, valueFromRedux]);
  return value;
};
