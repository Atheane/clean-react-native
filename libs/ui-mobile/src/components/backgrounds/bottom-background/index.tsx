import { View, StyleSheet, Dimensions } from 'react-native';
import { BottomLeavesBg } from '../../../assets';

export const BottomBackground = () => {
  return (
    <View style={styles.container}>
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
  bottom: {
    position: 'relative',
    top: Dimensions.get('window').height * 0.7,
    left: 0,
  },
});
