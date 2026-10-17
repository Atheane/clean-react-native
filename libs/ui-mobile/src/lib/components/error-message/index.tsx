import { View, Text } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

import { IDomainError, IInfraError } from '@clean-rn/ddd';
import { firstLetterCapitalize } from '../../utils';

import { IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';

type IProps = {
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | IInfraError | null;
};
export const ErrorMessage = (props: IProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <View>
      {props.error &&
        props.error.code &&
        Object.values(IAuthErrorCodes).includes(props.error.code as IAuthErrorCodes) && (
          <View>
            <Text style={theme.errors}>
              {firstLetterCapitalize(t(`errors.domainError.auth.${props.error.code}`))}
            </Text>
          </View>
        )}
      {props.error &&
        props.error.code &&
        !Object.values(IAuthErrorCodes).includes(props.error.code as IAuthErrorCodes) && (
          <View>
            <Text style={theme.errors}>{firstLetterCapitalize(t('errors.domainError.other'))}</Text>
            {props.error.code && <Text style={theme.errors}>{'\n\n Code erreur : ' + props.error.code}</Text>}
            {props.error.message && (
              <Text style={theme.errors}>{firstLetterCapitalize(props.error.message)}</Text>
            )}
            {props.error.cause && (
              <Text style={theme.errors}>{firstLetterCapitalize(props.error.cause)}</Text>
            )}
          </View>
        )}
      {props.error && !props.error?.code && (
        <View>
          <Text style={theme.errors}>{firstLetterCapitalize(t('errors.unknownError'))}</Text>
          {props.error.message && (
            <Text style={theme.errors}>{'\n' + firstLetterCapitalize(props.error.message)}</Text>
          )}
          {props.error.cause && <Text style={theme.errors}>{firstLetterCapitalize(props.error.cause)}</Text>}
        </View>
      )}
    </View>
  );
};
