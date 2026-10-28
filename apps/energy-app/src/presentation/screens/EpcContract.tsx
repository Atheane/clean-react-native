import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@rneui/themed';
import { PrimaryButton } from '@clean-rn/ui-mobile';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary, SafeScrollingView } from '../hoc';

const HEIGHT = Dimensions.get('window').height;
export const EpcContract = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleOnPress = () => {
    console.log('redirect to contract page');
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={(theme.text.content, { fontSize: 20, lineHeight: 36 })}>
              Should you achieve <Text style={[theme.text.boldRed, { fontSize: 36 }]}>1342.8 </Text>
              comfort-price
            </Text>
          </View>
          <View style={styles.pdfContainer}>
            <Text style={[theme.text.content, { lineHeight: 36 }]}>EPC contract terms here</Text>
            <Text style={[theme.text.content, { lineHeight: 36 }]}>Below baseline you win X</Text>
            <Text style={[theme.text.content, { lineHeight: 36 }]}>Above you loose Y</Text>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton title={'SIGN'} onPress={handleOnPress} />
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    height: HEIGHT,
  },
  textContainer: {
    marginVertical: 50,
    marginHorizontal: 16,
  },
  pdfContainer: {
    marginVertical: 50,
  },
  buttonContainer: {
    marginTop: 60,
    marginHorizontal: 16,
    alignItems: 'center',
  },
});
