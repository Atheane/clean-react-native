import { View, Text, Image, StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors, FontNames } from '../../../constants';
import { GreenEuro } from '../../../assets/images';

export const Reward = ({ reward }: { reward: number }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.rewardText}>{reward.toString().replace('.', ',')}</Text>
      <View style={styles.imgContainer}>
        <Image source={GreenEuro} style={[styles.greenEuroImg]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary.lightPurple,
    width: Dimensions.get('window').width * 0.6,
    height: 90,
    marginVertical: 8,
    justifyContent: 'center',
    borderRadius: 17,
    marginLeft: Platform.OS === 'web' ? 20 : 0,
  },
  imgContainer: {
    marginBottom: 10,
    marginLeft: -10,
  },
  greenEuroImg: {
    marginTop: 8,
    width: 90,
    height: 90,
  },
  rewardText: {
    color: Colors.primary.white,
    fontSize: 41,
    fontWeight: 'bold',
    fontFamily: FontNames.MartelSans_900Black,
    paddingLeft: 32,
  },
});
