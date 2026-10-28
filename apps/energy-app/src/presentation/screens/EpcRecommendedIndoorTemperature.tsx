import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { LinePlot, Colors, PrimaryButton } from '@clean-rn/ui-mobile';
import { ErrorBoundary, SafeScrollingView } from '../hoc';
import { IEpcStackPages } from '../types';

const HEIGHT = Dimensions.get('window').height;

const FAKE_BASELINE = [17.5, 20, 19.5, 21, 24, 25, 27.7, 25, 26, 25, 20, 17.5, 18];
const FAKE_VEOLIA = [19.5, 20, 19.5, 20, 22, 23, 24, 23, 24.5, 23, 21, 20.5, 19.5];

export const EpcRecommendedIndoorTemperature = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate(IEpcStackPages.EPC_CONTRACT);
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={(theme.text.content, { fontSize: 20, lineHeight: 36 })}>
              You can achieve <Text style={[theme.text.boldRed, { fontSize: 36 }]}>1342.8 </Text>
              comfort-price should you set your inside temperature to this:
            </Text>
          </View>
          <View style={styles.chartContainer}>
            <LinePlot
              title={'Indoor Air Temperature (C°)'}
              subtitle=""
              data={[FAKE_BASELINE, FAKE_VEOLIA]}
              labels={['Average meteo data', 'Internal temperature']}
              colors={[Colors.primary.grey, Colors.primary.green]}
              yLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
              yAxisLabel="C°"
            />
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
    alignItems: 'center',
    backgroundColor: 'white',
    height: HEIGHT * 1.1,
  },
  textContainer: {
    marginTop: 50,
    marginHorizontal: 16,
  },
  chartContainer: {
    marginTop: 50,
  },
  buttonContainer: {
    marginTop: 60,
    marginHorizontal: 16,
    alignItems: 'center',
  },
});
