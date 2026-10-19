import { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { CustomImage, PrimaryButton } from '@shared/presentation/components';
import { RightChevron } from '@shared/presentation/assets';

import { Warning } from '@carbon/presentation/assets';
import { navigateTo } from '@shared/infrastructure/redux/actions';
import { CARBON_STACK_PAGES } from '@carbon/presentation/types';
import { Colors, FontNames } from '@shared/presentation/constants';

export const WarningFood = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOnPress = useCallback(() => {
    dispatch(navigateTo({ route: CARBON_STACK_PAGES.FOOD }));
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomImage source={Warning} width={200} height={200} />
        <Text style={styles.title}>{t('screens.warningFood.title')}</Text>
        <Text style={styles.text}>{t('screens.warningFood.text')}</Text>
        <PrimaryButton
          fixedSize
          pressed={false}
          title={t('screens.warningFood.next')}
          iconTwo={RightChevron}
          onPress={handleOnPress}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 26,
    color: Colors.text.darkBlue,
  },
  text: {
    textAlign: 'justify',
    fontFamily: FontNames.MartelSans_400Regular,
    fontSize: 16,
    color: Colors.text.darkGrey,
    width: '80%',
    paddingTop: 20,
    paddingBottom: 30,
  },
});
