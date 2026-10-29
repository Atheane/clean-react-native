import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary, SafeScrollingView } from '../hoc';
import { PrimaryButton } from '@clean-rn/ui-mobile';
import { useNavigation } from '@react-navigation/native';
import { IEpcStackPages } from '../types';

const HEIGHT = Dimensions.get('window').height;
export const EpcCurrentSituation = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const handleOnPress = () => {
    navigation.navigate(IEpcStackPages.AFTER_RENOVATION);
  };
  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={theme.text.title}>
              Your
              <Text style={[theme.text.boldBlue, { fontSize: 30 }]}> comfort-price</Text>
            </Text>
          </View>
          <View style={styles.kpiContainer}>
            <Text style={[theme.text.kpi, { color: 'blue' }]}>1577.4</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={(theme.text.content, { textAlign: 'justify', fontSize: 20, lineHeight: 36 })}>
              To make your house warmer or cooler by just <Text style={theme.text.boldBlue}>1°C</Text>{' '}
              compared to the outside temperature, you used
              <Text style={theme.text.boldBlue}> 1577.4 kWh</Text> of energy each year on average from 2017 to
              2019. And you paid <Text style={theme.text.boldBlue}>XX€</Text> for this 1°C heating or cooling.
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
    marginLeft: 20,
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
    marginBottom: 100,
  },
});
