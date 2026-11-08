import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SunnyHouse, Colors, FontNames } from '@clean-rn/ui-mobile';

type IProps = {
  title?: string;
  description: string;
};

export const Introduction = ({ title, description }: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.sunnyHouseContainer}>
        <SunnyHouse />
      </View>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary.white,
    width: '80%',
    marginHorizontal: Dimensions.get('window').width * 0.1,
  },
  titleContainer: {
    marginTop: 40,
  },
  sunnyHouseContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.secondary.black,
    fontFamily: FontNames.MartelSans_900Black,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: Colors.primary.darkGrey,
    fontFamily: FontNames.MartelSans_400Regular,
    textAlign: 'left',
    marginTop: 36,
  },
});
