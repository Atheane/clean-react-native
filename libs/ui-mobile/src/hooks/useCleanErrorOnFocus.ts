import { useState, useCallback, useEffect } from 'react';
import { IDomainError } from '@clean-rn/ddd';
import { IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';

export const useCleanErrorOnFocus = (
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | Error | null,
) => {
  const [domainError, setDomainError] = useState<
    IDomainError<IAuthErrorCodes, IAuthErrorMessage> | Error | null
  >(null);

  useEffect(() => {
    setDomainError(error);
  }, [error]);

  const onFocus = useCallback(() => {
    setDomainError(null);
  }, []);

  return { domainError, onFocus };
};
