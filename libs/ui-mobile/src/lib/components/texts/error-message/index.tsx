import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { IDomainError, IInfraError } from '@clean-rn/ddd';

import { IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';

import { firstLetterCapitalize } from '../../../utils';
import { Colors, FontNames } from '../../../constants';

type IProps = {
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | IInfraError | null;
};
export const ErrorMessage = (props: IProps) => {
  const { t } = useTranslation();
  return (
    <View>
      {props.error &&
        props.error.code &&
        Object.values(IAuthErrorCodes).includes(props.error.code as IAuthErrorCodes) && (
          <View>
            <Text style={styles.errors}>
              {firstLetterCapitalize(t(`errors.domainError.auth.${props.error.code}`))}
            </Text>
          </View>
        )}
      {props.error &&
        props.error.code &&
        !Object.values(IAuthErrorCodes).includes(props.error.code as IAuthErrorCodes) && (
          <View>
            <Text style={styles.errors}>{firstLetterCapitalize(t('errors.domainError.other'))}</Text>
            {props.error.code && (
              <Text style={styles.errors}>{'\n\n Code erreur : ' + props.error.code}</Text>
            )}
            {props.error.message && (
              <Text style={styles.errors}>{firstLetterCapitalize(props.error.message)}</Text>
            )}
            {props.error.cause && (
              <Text style={styles.errors}>{firstLetterCapitalize(props.error.cause)}</Text>
            )}
          </View>
        )}
      {props.error && !props.error?.code && (
        <View>
          <Text style={styles.errors}>{firstLetterCapitalize(t('errors.unknownError'))}</Text>
          {props.error.message && (
            <Text style={styles.errors}>{'\n' + firstLetterCapitalize(props.error.message)}</Text>
          )}
          {props.error.cause && <Text style={styles.errors}>{firstLetterCapitalize(props.error.cause)}</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errors: {
    color: Colors.bank.secondary.salmon,
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 12,
    textAlign: 'center',
  },
});
