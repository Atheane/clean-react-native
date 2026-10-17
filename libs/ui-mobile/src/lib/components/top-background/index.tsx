import { View, StyleSheet } from 'react-native';
import { TopLeavesBg } from '../../assets';

export const TopBackground = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TopLeavesBg />
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
    top: -500,
    left: 0,
  },
});
