import { View, StyleSheet, Dimensions } from 'react-native';

import { Logo, TopBlueBg, BottomLeavesBg } from '../../../assets';

export const TopDownBackground = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TopBlueBg />
      </View>
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.bottom}>
        <BottomLeavesBg />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    position: 'absolute',
    top: -232,
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
