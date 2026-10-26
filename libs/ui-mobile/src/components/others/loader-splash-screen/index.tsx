import { StyleSheet, Dimensions } from 'react-native';
import Lottie from 'lottie-react-native';
import { Loader as LoaderBANK } from '../../../assets';

export const LoaderSplashScreen = () => {
  return <Lottie source={LoaderBANK} autoPlay loop style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    pointerEvents: 'none',
  },
});
