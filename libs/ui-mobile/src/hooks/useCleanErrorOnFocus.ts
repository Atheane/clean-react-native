import { useState, useCallback, useEffect } from 'react';
import { useNavigationState } from '@react-navigation/native';

import { IDomainError } from '@clean-rn/ddd';
import { IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';
import { IBeneficiaryErrorCodes, IBeneficiaryErrorMessage } from '@clean-rn/beneficiary/domain';

export const useCleanErrorOnFocus = (
  error:
    | IDomainError<IAuthErrorCodes, IAuthErrorMessage>
    | IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>
    | null,
) => {
  const [domainError, setDomainError] = useState<
    | IDomainError<IAuthErrorCodes, IAuthErrorMessage>
    | IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>
    | null
  >(null);

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
