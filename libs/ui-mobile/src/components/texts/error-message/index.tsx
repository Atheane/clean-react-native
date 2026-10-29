import { View, Text } from 'react-native';

import { IDomainError } from '@clean-rn/ddd';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';
import { IUserErrorCodes, IUserErrorMessage } from '@clean-rn/user/domain';
import { IAccountErrorCodes, IAccountErrorMessage } from '@clean-rn/account/domain';
import { IBeneficiaryErrorCodes, IBeneficiaryErrorMessage } from '@clean-rn/beneficiary/domain';
import { ICarbonErrorCodes, ICarbonErrorMessage } from '@clean-rn/carbon/domain';
import {
  ICustomerErrorCodes,
  ICustomerErrorMessage,
  IDocumentErrorCodes,
  IDocumentErrorMessage,
} from '@clean-rn/kyc/domain';

import { useTheme } from '@rneui/themed';

import { IContactErrorCodes, IContactErrorMessage } from '@clean-rn/contact/domain';
import { ITransactionErrorCodes, ITransactionErrorMessage } from '@clean-rn/transaction/domain';
import { ICardErrorCodes, ICardErrorMessage } from '@clean-rn/card/domain';

type IProps = {
  error:
    | IDomainError<IAuthErrorCodes, IAuthErrorMessage>
    | IDomainError<IUserErrorCodes, IUserErrorMessage>
    | IDomainError<IAccountErrorCodes, IAccountErrorMessage>
    | IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage>
    | IDomainError<IContactErrorCodes, IContactErrorMessage>
    | IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>
    | IDomainError<ICustomerErrorCodes, ICustomerErrorMessage>
    | IDomainError<IDocumentErrorCodes, IDocumentErrorMessage>
    | IDomainError<ITransactionErrorCodes, ITransactionErrorMessage>
    | IDomainError<ICardErrorCodes, ICardErrorMessage>
    | null;
  errorMessage: string;
  genericErrorMessage: string;
};
export const ErrorMessage = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <View>
      {props.error?.code && Object.values(IAuthErrorCodes).includes(props.error.code as IAuthErrorCodes) && (
        <View>
          <Text style={theme.text.errors}>{firstLetterCapitalize(props.errorMessage)}</Text>
        </View>
      )}
      {props.error?.code && Object.values(IUserErrorCodes).includes(props.error.code as IUserErrorCodes) && (
        <View>
          <Text style={theme.text.errors}>{firstLetterCapitalize(props.errorMessage)}</Text>
        </View>
      )}
      {props.error?.code &&
        Object.values(IAccountErrorCodes).includes(props.error.code as IAccountErrorCodes) && (
          <View>
            <Text style={theme.text.errors}>{firstLetterCapitalize(props.errorMessage)}</Text>
          </View>
        )}
      {props.error?.code &&
        Object.values(IBeneficiaryErrorCodes).includes(props.error.code as IBeneficiaryErrorCodes) && (
          <View>
            <Text style={theme.text.errors}>{firstLetterCapitalize(props.errorMessage)}</Text>
          </View>
        )}
      {props.error?.code &&
        Object.values(IContactErrorCodes).includes(props.error.code as IContactErrorCodes) && (
          <View>
            <Text style={theme.text.errors}>{firstLetterCapitalize(props.errorMessage)}</Text>
          </View>
        )}
      {props.error?.code &&
        Object.values(ICarbonErrorCodes).includes(props.error.code as ICarbonErrorCodes) && (
          <View>
            <Text style={theme.text.errors}>{firstLetterCapitalize(props.errorMessage)}</Text>
          </View>
        )}
      {props.error?.code &&
        Object.values(ICustomerErrorCodes).includes(props.error.code as ICustomerErrorCodes) && (
          <View>
            <Text style={theme.text.errors}>{firstLetterCapitalize(props.errorMessage)}</Text>
          </View>
        )}
      {props.error?.code &&
        Object.values(IDocumentErrorCodes).includes(props.error.code as IDocumentErrorCodes) && (
          <View>
            <Text style={theme.text.errors}>{firstLetterCapitalize(props.errorMessage)}</Text>
          </View>
        )}
      {props.error?.code &&
        Object.values(ITransactionErrorCodes).includes(props.error.code as ITransactionErrorCodes) && (
          <View>
            <Text style={theme.text.errors}>{firstLetterCapitalize(props.errorMessage)}</Text>
          </View>
        )}
      {props.error?.code && Object.values(ICardErrorCodes).includes(props.error.code as ICardErrorCodes) && (
        <View>
          <Text style={theme.text.errors}>{firstLetterCapitalize(props.errorMessage)}</Text>
        </View>
      )}
      {props.error?.code &&
        !Object.values(IAuthErrorCodes).includes(props.error.code as IAuthErrorCodes) &&
        !Object.values(IUserErrorCodes).includes(props.error.code as IUserErrorCodes) &&
        !Object.values(IAccountErrorCodes).includes(props.error.code as IAccountErrorCodes) &&
        !Object.values(IBeneficiaryErrorCodes).includes(props.error.code as IBeneficiaryErrorCodes) &&
        !Object.values(IContactErrorCodes).includes(props.error.code as IContactErrorCodes) &&
        !Object.values(ICarbonErrorCodes).includes(props.error.code as ICarbonErrorCodes) &&
        !Object.values(ICustomerErrorCodes).includes(props.error.code as ICustomerErrorCodes) &&
        !Object.values(IDocumentErrorCodes).includes(props.error.code as IDocumentErrorCodes) &&
        !Object.values(ITransactionErrorCodes).includes(props.error.code as ITransactionErrorCodes) &&
        !Object.values(ICardErrorCodes).includes(props.error.code as ICardErrorCodes) && (
          <View>
            <Text style={theme.text.errors}>{firstLetterCapitalize(props.errorMessage)}</Text>
            {props.error.code && (
              <Text style={theme.text.errors}>{'\n\n Code erreur : ' + props.error.code}</Text>
            )}
            {props.error.message && (
              <Text style={theme.text.errors}>{firstLetterCapitalize(props.error.message)}</Text>
            )}
          </View>
        )}
      {props.error && !props.error?.code && (
        <View>
          <Text style={theme.text.errors}>{firstLetterCapitalize(props.genericErrorMessage)}</Text>
          {props.error.message && (
            <Text style={theme.text.errors}>{'\n' + firstLetterCapitalize(props.error.message)}</Text>
          )}
        </View>
      )}
    </View>
  );
};
