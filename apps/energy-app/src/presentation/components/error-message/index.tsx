import { View, Text } from 'react-native';

import { IDomainError } from '@clean-rn/ddd';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';
import { IUserErrorCodes, IUserErrorMessage } from '@clean-rn/user/domain';

import { useTheme } from '@rneui/themed';

type IProps = {
  error:
    | IDomainError<IAuthErrorCodes, IAuthErrorMessage>
    | IDomainError<IUserErrorCodes, IUserErrorMessage>
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
        !Object.values(IAuthErrorCodes).includes(props.error.code as IAuthErrorCodes) &&
        !Object.values(IUserErrorCodes).includes(props.error.code as IUserErrorCodes) && (
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
