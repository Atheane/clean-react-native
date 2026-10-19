import { useState, useEffect } from 'react';
import { useNavigationState } from '@react-navigation/native';
import { IDomainError } from '@clean-rn/ddd';
import { IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';

export const useCleanErrorOnNavigation = (error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null) => {
  const [domainError, setDomainError] = useState<IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null>(
    null,
  );

  useEffect(() => {
    setDomainError(error);
  }, [error]);

  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  useEffect(() => {
    setDomainError(null);
  }, [navigationStack]);

  return { domainError };
};
