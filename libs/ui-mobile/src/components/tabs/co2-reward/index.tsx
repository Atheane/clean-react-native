import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../../constants';
import { PrimaryButton } from '../../buttons/primary-button';
import { Tag } from '../../tags';

type IProps = {
  tableHead: string[];
  tableData: string[][];
  rowLabels: string[];
  onPress: () => void;
};

export const TabCO2Reward = (props: IProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.headerRow]}>
        <View style={[styles.cell, styles.labelCell]}>
          <Text style={styles.headerText}></Text>
        </View>
        {props.tableHead.map((header, index) => (
          <View key={index} style={styles.cell}>
            <Text
              style={
                index % 2 === 0
                  ? { ...styles.headerText, ...styles.headerLeft }
                  : { ...styles.headerText, ...styles.headerRight }
              }
            >
              {header}
            </Text>
          </View>
        ))}
      </View>
      {props.tableData.map((rowData, rowIndex) => (
        <View key={rowIndex} style={[styles.row, rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow]}>
          <View style={[styles.cell, styles.labelCell]}>
            <Text style={styles.labelText}>{props.rowLabels[rowIndex]}</Text>
          </View>
          {rowData.map((cellData, cellIndex) => (
            <View key={cellIndex} style={styles.cell}>
              {cellData === 'N.A' && cellIndex % 2 === 0 ? (
                <View style={styles.cellNA}>
                  <PrimaryButton title={t('tabs-co2.button')} onPress={props.onPress} mini />
                </View>
              ) : cellData === 'N.A' && cellIndex % 2 === 1 ? (
                <View style={styles.tag}>
                  <Tag color={Colors.bank.primary.lightGrey} text={t('tabs-co2.tag')} />
                </View>
              ) : (
                <Text style={styles.cellText}>{cellData}</Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: Colors.bank.primary.white,
  },
  row: {
    flexDirection: 'row',
  },
  headerRow: {
    backgroundColor: Colors.bank.primary.white,
  },
  evenRow: {
    backgroundColor: Colors.bank.primary.darkWhite,
  },
  oddRow: {
    backgroundColor: Colors.bank.primary.white,
  },
  cell: {
    flex: 1,
    width: 160,
    padding: 14,
    justifyContent: 'center',
  },
  labelCell: {
    width: 80,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'left',
    color: Colors.bank.primary.darkGrey,
  },
  headerLeft: {
    marginLeft: -20,
  },
  headerRight: {
    marginLeft: 0,
  },
  labelText: {
    textAlign: 'left',
    color: Colors.bank.primary.darkBlue,
  },
  cellText: {
    textAlign: 'left',
    color: Colors.bank.primary.darkGrey,
  },
  cellNA: {
    flex: 1,
    width: 160,
    marginLeft: -50,
    justifyContent: 'center',
  },
  tag: {
    marginLeft: -10,
  },
});
