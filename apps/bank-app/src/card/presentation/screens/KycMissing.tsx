import { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { LinkButton } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IKycStackPages } from '../../../shared/presentation/types';

import { InitKyc } from '../../../kyc/presentation/assets/images';

const HEIGHT = Dimensions.get('screen').height;
export const KycMissing = () => {
  const { theme } = useTheme();

  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleOnPress = useCallback(() => {
    navigation.navigate(IKycStackPages.MENU as never);
  }, [navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.bank.container.centeredItem]}>
          <Image source={InitKyc} style={{ width: 250, height: 250 }} />
          <Text style={[styles.instruction, theme.bank.text.grey, { fontSize: 16 }]}>
            {t('screens.card.kyc-missing.instruction')}
            <Text style={[styles.instruction, theme.bank.text.boldGrey, { fontSize: 16 }]}>
              {t('screens.card.kyc-missing.instruction-bold')}
            </Text>
          </Text>
          <LinkButton
            title={t('screens.card.kyc-missing.link-instruction')}
            onPress={handleOnPress}
            inline={[theme.bank.text.darkBlue, { fontSize: 16 }]}
          />
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
    justifyContent: 'flex-start',
    marginTop: -150,
  },
  iconContainer: {
    marginTop: 16,
  },
  instruction: {
    textAlign: 'justify',
    width: '85%',
    marginVertical: 24,
  },
});
