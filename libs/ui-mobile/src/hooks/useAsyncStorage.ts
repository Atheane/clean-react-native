import { useState, useCallback } from 'react';
import { getItemFromStore, storeItem } from '@clean-rn/shared/infrastructure';

export const useAsyncStorage = (key: string, value?: string) => {
  const [storedValue, setStoredValue] = useState<string | null>(null);

  const getItem = useCallback(async () => {
    const value = await getItemFromStore(key);
    setStoredValue(value);
  }, [key]);

  const setItem = useCallback(async () => {
    if (value) {
      await storeItem(key, value);
    }
  }, [key, value]);

  return { storedValue, getItem, setItem };
};
