import { View, StyleSheet } from 'react-native';

import { TopLeavesBg } from '../../../assets';

export const TopBackground = () => {
  return (
    <View style={styles.top}>
      <TopLeavesBg />
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    top: -500,
    left: 0,
  },
});
