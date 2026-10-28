import { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Colors } from '@clean-rn/ui-mobile';
import { fetchLogout } from '../../../auth/application/commands';
import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { GoodBye as GoodByeImg } from '../assets/images';
import { useDispatch } from 'react-redux';

export const GoodBye = () => {
  // translations
  const { t } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchLogout());
    }, 3000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <ErrorBoundary t={t}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={{ width: 200, height: 200 }} source={GoodByeImg} />
        </View>
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary.white,
  },
  imageContainer: {
    marginTop: -100,
  },
});
