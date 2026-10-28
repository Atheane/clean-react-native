import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';

import { firstLetterCapitalize } from '@clean-rn/utils';
import { ServerError } from '@clean-rn/shared/infrastructure';
import { Colors } from '../../../constants';

type IProps = {
  error: ServerError | Error;
  errorCode: string;
  errorDetails: string;
  errorStack: string;
  genericMessage: string;
};
export const ModalError = (props: { error: ServerError | Error } & IProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <Text style={theme.text.errors}>{firstLetterCapitalize(props.genericMessage)}</Text>
        {props.error instanceof ServerError && props.error?.statusCode && (
          <Text style={theme.text.errors}>{`\n ${props.errorCode}: ${props.error.statusCode}`}</Text>
        )}
        {props.error?.message && (
          <Text style={theme.text.errors}>
            {`\n ${props.errorDetails}: ${firstLetterCapitalize(props.error.message)}`}
          </Text>
        )}
        {props.error?.stack && (
          <Text style={theme.text.errors}>
            {`\n ${props.errorStack}: ${firstLetterCapitalize(props.error.stack)}`}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    height: '100%',
  },
  modalContainer: {
    marginVertical: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
