import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Colors } from '@clean-rn/ui-mobile';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { GoodBye as GoodByeImg } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const GoodBye = () => {
  // translations
  const { t } = useTranslation();

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View style={styles.imageContainer}>
            <Image style={{ width: 250, height: 250 }} source={GoodByeImg} />
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bank.primary.white,
  },
  imageContainer: {
    marginTop: -160,
  },
});
