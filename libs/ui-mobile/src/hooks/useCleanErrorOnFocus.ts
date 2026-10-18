import { useState, useCallback, useEffect } from 'react';
import { IDomainError, IInfraError } from '@clean-rn/ddd';
import { AuthErrorCodes, AuthErrorMessage } from '@clean-rn/auth/domain';

export const useCleanErrorOnFocus = (
  error: IDomainError<AuthErrorCodes, AuthErrorMessage> | IInfraError | null,
) => {
  const [domainError, setDomainError] = useState<
    IDomainError<AuthErrorCodes, AuthErrorMessage> | IInfraError | null
  >(null);

  useEffect(() => {
    setDomainError(error);
  }, [error]);

  const onFocus = useCallback(() => {
    setDomainError(null);
  }, []);

  return { domainError, onFocus };
};
