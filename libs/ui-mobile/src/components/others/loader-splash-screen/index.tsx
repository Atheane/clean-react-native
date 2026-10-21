import { StyleSheet, Dimensions } from 'react-native';
import Lottie from 'lottie-react-native';
import { Loader as LoaderBANK } from '../../../assets';

export const LoaderSplashScreen = () => {
  return <Lottie source={LoaderBANK} autoPlay loop style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    marginHorizontal: Dimensions.get('window').width / 2 - 100,
    marginVertical: Dimensions.get('window').height / 2 - 150,
  },
});
