import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { IDomainError } from '@clean-rn/ddd';

import { IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';

import { useTheme } from '@rneui/themed';

import { firstLetterCapitalize } from '../../../utils';

type IProps = {
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null;
};
export const ErrorMessage = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <View>
      {props.error &&
        props.error.code &&
        Object.values(IAuthErrorCodes).includes(props.error.code as IAuthErrorCodes) && (
          <View>
            <Text style={theme.bank.text.errors}>
              {firstLetterCapitalize(t(`errors.domain-error.auth.${props.error.code}`))}
            </Text>
          </View>
        )}
      {props.error &&
        props.error.code &&
        !Object.values(IAuthErrorCodes).includes(props.error.code as IAuthErrorCodes) && (
          <View>
            <Text style={theme.bank.text.errors}>
              {firstLetterCapitalize(t('errors.domain-error.other'))}
            </Text>
            {props.error.code && (
              <Text style={theme.bank.text.errors}>{'\n\n Code erreur : ' + props.error.code}</Text>
            )}
            {props.error.message && (
              <Text style={theme.bank.text.errors}>{firstLetterCapitalize(props.error.message)}</Text>
            )}
          </View>
        )}
      {props.error && !props.error?.code && (
        <View>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.unknown-error'))}</Text>
          {props.error.message && (
            <Text style={theme.bank.text.errors}>{'\n' + firstLetterCapitalize(props.error.message)}</Text>
          )}
        </View>
      )}
    </View>
  );
};
