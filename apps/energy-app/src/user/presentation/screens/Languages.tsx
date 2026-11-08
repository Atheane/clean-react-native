import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';

import { useTheme } from '@rneui/themed';
import {
  FlagForFrance,
  FlagForGermany,
  FlagForGreece,
  FlagForItaly,
  FlagForSpain,
  FlagForUK,
  FlagForPortugal,
  FlagForPoland,
} from '@clean-rn/ui-mobile';

import { ILanguage } from '@clean-rn/user/domain';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { fetchUpdateLanguage } from '../../../user/application/commands';

import i18n from '../../../shared/presentation/translations/i18n';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { set } from 'react-hook-form';

const mapLanguageToi18n = (lg: ILanguage) => {
  if (lg === ILanguage.EL) {
    return 'el';
  }
  return lg.toLowerCase();
};

const locale = getLocales()[0]?.languageCode || 'fr';

export const Languages = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const handleSelectLanguage = useCallback(
    (lg: ILanguage) => {
      dispatch(
        fetchUpdateLanguage({
          lang: lg,
        }),
      );
      i18n.changeLanguage(mapLanguageToi18n(lg as ILanguage));
      setCurrentLanguage(lg);
    },
    [dispatch],
  );

  const { user } = useSelector((state: IRootState) => state.user);

  const [currentLanguage, setCurrentLanguage] = useState<ILanguage>(ILanguage.FR);
  useEffect(() => {
    if (user?.properties.config?.lang) {
      setCurrentLanguage(user.properties.config.lang.toLocaleUpperCase() as ILanguage);
    } else {
      setCurrentLanguage(locale.toLocaleUpperCase() as ILanguage);
    }
  }, [user?.properties.config?.lang]);

  console.log('currentLanguage', currentLanguage);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={{ marginVertical: 8, opacity: currentLanguage === ILanguage.FR ? 1 : 0.5 }}
              onPress={() => handleSelectLanguage(ILanguage.FR)}
            >
              <FlagForFrance width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 8, opacity: currentLanguage === ILanguage.IT ? 1 : 0.5 }}
              onPress={() => handleSelectLanguage(ILanguage.IT)}
            >
              <FlagForItaly width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={{ marginVertical: 8, opacity: currentLanguage === ILanguage.EL ? 1 : 0.5 }}
              onPress={() => handleSelectLanguage(ILanguage.EL)}
            >
              <FlagForGreece width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 8, opacity: currentLanguage === ILanguage.DE ? 1 : 0.5 }}
              onPress={() => handleSelectLanguage(ILanguage.DE)}
            >
              <FlagForGermany width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={{ marginVertical: 8, opacity: currentLanguage === ILanguage.ES ? 1 : 0.5 }}
              onPress={() => handleSelectLanguage(ILanguage.ES)}
            >
              <FlagForSpain width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 8, opacity: currentLanguage === ILanguage.EN ? 1 : 0.5 }}
              onPress={() => handleSelectLanguage(ILanguage.EN)}
            >
              <FlagForUK width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={{ marginVertical: 8, opacity: currentLanguage === ILanguage.PT ? 1 : 0.5 }}
              onPress={() => handleSelectLanguage(ILanguage.PT)}
            >
              <FlagForPortugal width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 8, opacity: currentLanguage === ILanguage.PL ? 1 : 0.5 }}
              onPress={() => handleSelectLanguage(ILanguage.PL)}
            >
              <FlagForPoland width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
            </TouchableOpacity>
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
    justifyContent: 'space-around',
    marginTop: 60,
    marginBottom: 200,
  },
  iconContainer: {
    marginHorizontal: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    marginVertical: 40,
  },
});
