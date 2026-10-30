import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { DraggableLinePlot, Colors, PrimaryButton } from '@clean-rn/ui-mobile';
import { IEpcStackPages } from '../types';

const FAKE_BASELINE = [17.5, 20, 19.5, 21, 24, 25, 27.7, 25, 26, 25, 20, 17.5, 18];
const FAKE_VEOLIA = [19.5, 20, 19.5, 20, 22, 23, 24, 23, 24.5, 23, 21, 20.5, 19.5];

export const EpcRecommendedIndoorTemperature = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate(IEpcStackPages.EPC_CONTRACT as never);
  };

  const handleOnDrag = (value: number | { x: number; y: number } | null) => {
    console.log('handle on drag:', value);
  };

  return (
    <DraggableLinePlot
      above={() => (
        <View style={styles.textContainer}>
          <Text style={(theme.text.content, { fontSize: 20, lineHeight: 36 })}>
            You can achieve <Text style={[theme.text.boldRed, { fontSize: 36 }]}>1342.8 </Text>
            comfort-price should you set your inside temperature to this:
          </Text>
        </View>
      )}
      below={() => (
        <View style={styles.buttonContainer}>
          <PrimaryButton title={'CTA (to improve)'} onPress={handleOnPress} />
        </View>
      )}
      data={[FAKE_BASELINE, FAKE_VEOLIA]}
      labels={['Meteo', 'Internal C°']}
      colors={[Colors.primary.grey, Colors.primary.green]}
      xlabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
      handleDrag={handleOnDrag}
    />
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 50,
    marginHorizontal: 16,
  },
  chartContainer: {
    flex: 1,
    marginVertical: 50,
  },
  buttonContainer: {
    marginHorizontal: 16,
    alignItems: 'center',
    marginBottom: 50,
  },
});
