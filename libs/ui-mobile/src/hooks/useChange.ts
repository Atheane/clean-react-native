import { useState, useCallback } from 'react';

export const useChange = (init: number | boolean) => {
  const [value, setValue] = useState<number | boolean>(init);

  const onChange = useCallback((val: number | boolean) => {
    if (val) {
      setValue(val);
    }
  }, []);

  return { value, onChange };
};
