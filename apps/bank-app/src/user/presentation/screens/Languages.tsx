import { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Flag from 'react-native-ico-emojione-emojis';
import { useTheme } from '@rneui/themed';

import { ILanguage } from '@clean-rn/user/domain';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { fetchUpdateLanguage } from '../../../user/application/commands';

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
              <Flag
                name="flag-for-france"
                width={90}
                height={90}
                style={[styles.iconContainer, theme.bank.shadow.button]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 8 }}
              onPress={() => handleSelectLanguage(ILanguage.IT)}
            >
              <Flag
                name="flag-for-italy"
                width={90}
                height={90}
                style={[styles.iconContainer, theme.bank.shadow.button]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={{ marginVertical: 8 }}
              onPress={() => handleSelectLanguage(ILanguage.EL)}
            >
              <Flag
                name="flag-for-greece"
                width={90}
                height={90}
                style={[styles.iconContainer, theme.bank.shadow.button]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 8 }}
              onPress={() => handleSelectLanguage(ILanguage.DE)}
            >
              <Flag
                name="flag-for-germany"
                width={90}
                height={90}
                style={[styles.iconContainer, theme.bank.shadow.button]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={{ marginVertical: 8 }}
              onPress={() => handleSelectLanguage(ILanguage.ES)}
            >
              <Flag
                name="flag-for-spain"
                width={90}
                height={90}
                style={[styles.iconContainer, theme.bank.shadow.button]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 8 }}
              onPress={() => handleSelectLanguage(ILanguage.EN)}
            >
              <Flag
                name="flag-for-united-kingdom"
                width={90}
                height={90}
                style={[styles.iconContainer, theme.bank.shadow.button]}
              />
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
