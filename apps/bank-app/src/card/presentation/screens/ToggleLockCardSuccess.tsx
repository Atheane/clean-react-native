import { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { LinkButton, PrimaryButton, Validate } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { ICardStackPages } from '../../../shared/presentation/types';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { Success } from '../assets';
import { ICardStatuses } from '@clean-rn/card/domain';

const HEIGHT = Dimensions.get('screen').height;
export const ToggleLockCardSuccess = () => {
  const { theme } = useTheme();

  const { t } = useTranslation();
  const navigation = useNavigation();

  const { card } = useSelector((state: IRootState) => state.card);

  const handleOnPress = useCallback(() => {
    navigation.navigate(ICardStackPages.CARD as never);
  }, [navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.bank.container.centeredItem]}>
          <Image source={Success} style={{ width: 250, height: 250 }} />
          <View style={styles.rowContainer}>
            <Text style={[styles.instruction, theme.bank.text.grey, { fontSize: 16 }]}>
              {card?.properties.status === ICardStatuses.LOCK
                ? t('screens.card.toggle-lock-success.lock')
                : t('screens.card.toggle-lock-success.unlock')}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={t('screens.card.toggle-lock-success.ok')}
              long
              uppercase
              iconOne={Validate}
              onPress={handleOnPress}
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
    height: HEIGHT,
    justifyContent: 'center',
    marginTop: -50,
  },
  iconContainer: {
    marginTop: 16,
  },
  rowContainer: {},
  buttonContainer: {
    marginTop: 100,
  },
  instruction: {
    textAlign: 'justify',
    width: '85%',
    marginVertical: 24,
  },
});
