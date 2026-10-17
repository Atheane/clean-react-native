import { useState, useCallback } from 'react';

export const useEdit = (init: boolean) => {
  const [filled, setFilled] = useState<boolean>(init);

  const onEdit = useCallback(() => {
    setFilled(false);
  }, []);

  return { filled, onEdit };
};
