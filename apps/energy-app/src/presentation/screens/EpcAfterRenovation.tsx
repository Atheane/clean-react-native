import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@rneui/themed';
import { PrimaryButton } from '@clean-rn/ui-mobile';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { ErrorBoundary, SafeScrollingView } from '../hoc';
import { IEpcStackPages } from '../types';

const HEIGHT = Dimensions.get('window').height;
export const EpcAfterRenovation = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate(IEpcStackPages.RECOMMENDED_INDOOR_TEMPERATURE);
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={theme.text.title}>
              After renovation, can you keep your
              <Text style={[theme.text.boldRed, { fontSize: 30 }]}> comfort-price</Text> to
            </Text>
          </View>
          <View style={styles.kpiContainer}>
            <Text style={[theme.text.kpi, { color: 'red' }]}>{1342.8}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={(theme.text.content, { textAlign: 'justify', fontSize: 20, lineHeight: 36 })}>
              You would save <Text style={theme.text.boldRed}>XXXkWH</Text> yearly, about
              <Text style={theme.text.boldRed}> YYY euros</Text> over 10 years!
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton title={'CTA (to improve)'} onPress={handleOnPress} />
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: HEIGHT,
  },
  titleContainer: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  kpiContainer: {
    marginTop: 50,
  },
  textContainer: {
    marginTop: 40,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 60,
    marginHorizontal: 16,
    alignItems: 'center',
  },
});
