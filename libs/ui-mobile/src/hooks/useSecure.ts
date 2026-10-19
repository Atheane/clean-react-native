import { useState, useCallback } from 'react';

export const useSecure = (init: boolean) => {
  const [secured, setSecured] = useState(init);

  const onToggleSecurity = useCallback(() => {
    setSecured(!secured);
  }, [secured]);

  return { secured, onToggleSecurity };
};
