import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

export const CarbonDrop = () => {
  const { t } = useTranslation();

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView fixedHeight>
        <View style={styles.container}>
          <Text>CarbonDrop</Text>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: (Dimensions.get('window').height - 100) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
