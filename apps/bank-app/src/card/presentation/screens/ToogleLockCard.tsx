import { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { ICardStatuses } from '@clean-rn/card/domain';

import { SmallSwitchButton, SubmitButton, useTogglePress } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { fetchToggleLock } from '../../application/commands';

const HEIGHT = Dimensions.get('screen').height;
export const ToggleLockCard = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { card, pending } = useSelector((state: IRootState) => state.card);

  const { pressed: isLocked, onPress: handleToggleCard } = useTogglePress(
    card?.properties.status === ICardStatuses.LOCK,
  );

  const dispatch = useDispatch();

  const handleOnSubmit = useCallback(() => {
    dispatch(fetchToggleLock({ lock: isLocked }));
  }, [dispatch, isLocked]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View style={styles.rowContainer}>
            <Text style={[theme.bank.text.darkBlue]}>{t('screens.card.toggle-lock.instruction')}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={[theme.bank.text.darkBlue]}>{t('screens.card.toggle-lock.lock')}</Text>
            <SmallSwitchButton checked={isLocked} onToggle={handleToggleCard} />
          </View>
          <View style={styles.buttonContainer}>
            <SubmitButton
              title={t('screens.card.toggle-lock.button')}
              uppercase
              loading={pending}
              onSubmit={handleOnSubmit}
            />
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
    marginTop: '10%',
  },
  iconContainer: {
    marginTop: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    width: '85%',
  },
  buttonContainer: {
    position: 'relative',
    bottom: '-35%',
  },
});
