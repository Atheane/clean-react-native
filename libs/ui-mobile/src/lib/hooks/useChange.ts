import { useState, useCallback } from 'react';

export const useChange = (init: number) => {
  const [value, setValue] = useState<number>(init);

  const onChange = useCallback((val: number) => {
    if (val) {
      setValue(val);
    }
  }, []);

  return { value, onChange };
};
