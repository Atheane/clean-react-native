import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { LinkButton, RightChevron } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { ITransferStackPages } from '../../../shared/presentation/types';

const HEIGHT = Dimensions.get('window').height;

export const Beneficiaries = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const handleOnPress = useCallback(
    (uid: string) => {
      console.log('onPress', uid);
      navigation.navigate(ITransferStackPages.TRANSFER, { uid });
    },
    [navigation],
  );
  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View style={styles.item}>
            <Text>Contact 1</Text>
            <LinkButton iconRight={RightChevron} onPress={() => handleOnPress('contact1')} />
          </View>
          <View style={styles.item}>
            <Text>Contact 2</Text>
            <LinkButton iconRight={RightChevron} onPress={() => handleOnPress('contact2')} />
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
