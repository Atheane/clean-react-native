import { useState, useCallback, useEffect } from 'react';
import { useNavigationState } from '@react-navigation/native';

import { IDomainError } from '@clean-rn/ddd';

export const useCleanErrorOnFocus = (error: IDomainError<any, any> | null) => {
  const [domainError, setDomainError] = useState<IDomainError<any, any> | null>(null);

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
