import { useCallback } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { Colors, StackedBarsCO2, TableBaseline } from '@clean-rn/ui-mobile';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { ISharedStackPages } from '../../../shared/presentation/types';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { URL_CO2_REWARD } from '../constants';

export const EvolutionFootprint = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const { email } = useSelector((state: IRootState) => state.auth);

  const handleOnPressPremium = useCallback(() => {
    navigation.navigate(ISharedStackPages.MODAL_WEBVIEW, { uid: URL_CO2_REWARD });
  }, [navigation]);

  const TESTEURS = ['dev1@example.com', 'user4@example.com', 'user2@example.com'];
  const fakeData = [
    ['1100 kg', '3100 kg', '4200 kg', '0 kg'],
    ['1000 kg', '0 kg', '1000 kg', '3200 kg'],
    ['400 kg', '0 kg', '400 kg', '3800 kg'],
    [],
  ];

  return (
    <ErrorBoundary t={t}>
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.primary.white }}
        contentContainerStyle={styles.container}
      >
        <View style={styles.row}>
          <StackedBarsCO2
            categories={['Voiture', 'Logement', 'CO2 Evité']}
            labels={['2019', '2020', '2021', '2022', '2023']}
            transport={[3100, 3100, 3000, 0, 0]}
            housing={[1100, 1100, 1000, 1000, 400]}
            savings={[800, 800, 1000, 4000, 4600]}
          />
        </View>
        <View style={styles.row}>
          <TableBaseline
            tableHead={['Logement', 'Voiture', 'Total', 'Evité']}
            tableData={email?.value && TESTEURS.includes(email.value) ? fakeData : []}
            rowLabels={['2019-2020', '2022', '2023', '2024']}
            onPress={handleOnPressPremium}
            buttonTitle={t('screens.footprint-evolution.receive')}
            tagText={t('screens.footprint-evolution.na')}
            baselineText={t('screens.footprint-evolution.baseline')}
          />
        </View>
      </ScrollView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    marginBottom: 300,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
  },
  titleContainer: {
    marginTop: 16,
  },
});
