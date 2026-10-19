import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

import { firstLetterCapitalize } from '../../../utils';
import { ServerError } from '@clean-rn/shared/infrastructure';
import { Colors } from '../../../constants';

export const ModalError = ({ error }: { error: ServerError | Error }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.other'))}</Text>
        {error instanceof ServerError && error?.code && (
          <Text style={theme.bank.text.errors}>
            {`\n ${t('modal-error.code')}: ${firstLetterCapitalize(error.code)}`}
          </Text>
        )}
        {error?.message && (
          <Text style={theme.bank.text.errors}>
            {`\n ${t('modal-error.details')}: ${firstLetterCapitalize(error.message)}`}
          </Text>
        )}
        {error?.stack && (
          <Text style={theme.bank.text.errors}>
            {`\n ${t('modal-error.stack')}: ${firstLetterCapitalize(error.stack)}`}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.white,
    height: '100%',
  },
  modalContainer: {
    marginVertical: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
