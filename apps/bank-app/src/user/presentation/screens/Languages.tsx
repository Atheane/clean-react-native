import { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import {
  i18n,
  FlagForFrance,
  FlagForGermany,
  FlagForGreece,
  FlagForItaly,
  FlagForSpain,
  FlagForUK,
} from '@clean-rn/ui-mobile';

import { ILanguage } from '@clean-rn/user/domain';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { fetchUpdateLanguage } from '../../../user/application/commands';

const mapLanguageToi18n = (lg: ILanguage) => {
  if (lg === ILanguage.EL) {
    return 'el';
  }
  return lg.toLowerCase();
};

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
    },
    [dispatch],
  );

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={{ marginVertical: 8 }}
              onPress={() => handleSelectLanguage(ILanguage.FR)}
            >
              <FlagForFrance width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 8 }}
              onPress={() => handleSelectLanguage(ILanguage.IT)}
            >
              <FlagForItaly width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={{ marginVertical: 8 }}
              onPress={() => handleSelectLanguage(ILanguage.EL)}
            >
              <FlagForGreece width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 8 }}
              onPress={() => handleSelectLanguage(ILanguage.DE)}
            >
              <FlagForGermany width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={{ marginVertical: 8 }}
              onPress={() => handleSelectLanguage(ILanguage.ES)}
            >
              <FlagForSpain width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 8 }}
              onPress={() => handleSelectLanguage(ILanguage.EN)}
            >
              <FlagForUK width={90} height={90} style={[styles.iconContainer, theme.shadow.button]} />
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
