import { useState, useCallback, useEffect } from 'react';
import { useNavigationState } from '@react-navigation/native';

export const useCleanErrorOnFocus = (error: any) => {
  const [domainError, setDomainError] = useState<any>(null);

  useEffect(() => {
    setDomainError(error);
  }, [error]);

  const onFocus = useCallback(() => {
    setDomainError(null);
  }, []);

  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  useEffect(() => {
    setDomainError(null);
  }, [navigationStack]);

  return { domainError, onFocus };
};
