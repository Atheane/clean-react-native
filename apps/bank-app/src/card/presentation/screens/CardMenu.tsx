import { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { LinkButton, LinkButtonColors } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { ICardStackPages } from '../../../shared/presentation/types';

import {
  BlueGradientSpeedmeter,
  BlueGradientLock,
  BlueGradientChangePin,
  BlueGradientShowPin,
  CB,
} from '../assets';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

const HEIGHT = Dimensions.get('screen').height;
export const CardMenu = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  //todo: lock / unlock logic in state

  const { pending, card, error } = useSelector((state: IRootState) => state.card);

  console.log('---------> error', error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={CB} style={{ width: 150, height: 300 }} />
          </View>

          <View style={styles.linksContainer}>
            <View style={styles.rowContainer}>
              <LinkButton
                iconLeft={BlueGradientSpeedmeter}
                colorOption={LinkButtonColors.BLUE}
                title={t('screens.card.menu.limits')}
                onPress={() => navigation.navigate(ICardStackPages.CARD_LIMITS as never)}
              />
            </View>
            <View style={styles.rowContainer}>
              <LinkButton
                iconLeft={BlueGradientLock}
                colorOption={LinkButtonColors.BLUE}
                title={t('screens.card.menu.lock')}
                onPress={() => navigation.navigate(ICardStackPages.LOCK_CARD as never)}
              />
            </View>
            <View style={[styles.rowContainer, { marginLeft: 4 }]}>
              <LinkButton
                iconLeft={BlueGradientChangePin}
                colorOption={LinkButtonColors.BLUE}
                title={t('screens.card.menu.change-pin')}
                onPress={() => navigation.navigate(ICardStackPages.CHANGE_PIN as never)}
              />
            </View>
            <View style={[styles.rowContainer, { marginLeft: 2 }]}>
              <LinkButton
                iconLeft={BlueGradientShowPin}
                colorOption={LinkButtonColors.BLUE}
                title={t('screens.card.menu.show-pin')}
                onPress={() => navigation.navigate(ICardStackPages.SHOW_PIN as never)}
              />
            </View>
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
    justifyContent: 'center',
  },
  imageContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  linksContainer: {
    flex: 1,
    marginLeft: 32,
  },
  rowContainer: {
    flexDirection: 'row',
  },
});
