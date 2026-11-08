import { View, StyleSheet, Dimensions } from 'react-native';

import { Green450 as Logo, TopBlueBg, BottomLeavesBg } from '../../../assets';
import { Colors } from '../../../constants';

export const TopDownBackground = () => {
  return (
    <View>
      <View style={styles.top}>
        <TopBlueBg />
      </View>
      <View style={styles.logo}>
        <Logo color={Colors.primary.white} width={52} height={52} />
      </View>
      <View style={styles.bottom}>
        <BottomLeavesBg />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    top: -280,
    left: 0,
  },
  logo: {
    position: 'relative',
    top: 40,
    left: 20,
  },
  bottom: {
    position: 'relative',
    top: Dimensions.get('window').height * 0.3,
    left: 0,
  },
});
