import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants';
import { PrimaryButton } from '../../buttons/primary-button';
import { Tag } from '../../tags';

type IProps = {
  tableHead: string[];
  tableData: string[][];
  rowLabels: string | React.ReactNode[];
  onPress: () => void;
  subtitle: string;
  buttonTitle: string;
  tagText: string;
};

export const TabCO2Split = (props: IProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.headerRow]}>
        <View style={[styles.cell, styles.labelCell]}>
          <Text style={styles.headerText}></Text>
        </View>
        {props.tableHead.map((header, index) => (
          <View key={index} style={styles.cell}>
            <Text style={styles.headerText}>{header}</Text>
          </View>
        ))}
      </View>
      {props.tableData.map((rowData, rowIndex) => (
        <View key={rowIndex} style={[styles.row, rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow]}>
          <View style={[styles.cell, styles.labelCell]}>
            {rowIndex === 0 ? (
              <View>
                <Text style={styles.labelText}>{props.rowLabels[rowIndex]}</Text>
                <Text style={styles.labelSubtitle}>{props.subtitle}</Text>
              </View>
            ) : (
              <Text style={styles.labelText}>{props.rowLabels[rowIndex]}</Text>
            )}
          </View>
          {rowData.map((cellData, cellIndex) => (
            <View key={cellIndex} style={styles.cell}>
              {cellData === 'N.A' && cellIndex % 2 === 1 ? (
                <View style={styles.cellNA}>
                  <PrimaryButton title={props.buttonTitle} onPress={props.onPress} mini />
                </View>
              ) : cellData === 'N.A' && cellIndex % 2 === 0 ? (
                <View style={styles.tag}>
                  <Tag color={Colors.primary.lightGrey} text={props.tagText} />
                </View>
              ) : (
                <Text
                  style={
                    cellIndex % 4 === 3
                      ? { ...styles.cellText, color: Colors.primary.green, fontWeight: 'bold' }
                      : styles.cellText
                  }
                >
                  {cellData}
                </Text>
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
    backgroundColor: Colors.primary.white,
  },
  row: {
    flexDirection: 'row',
  },
  headerRow: {
    backgroundColor: Colors.primary.white,
  },
  evenRow: {
    backgroundColor: Colors.primary.darkWhite,
  },
  oddRow: {
    backgroundColor: Colors.primary.white,
  },
  cell: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  labelCell: {
    flex: 2, // Increase the flex value to make the left column wider
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: -18,
    fontSize: 10,
    color: Colors.primary.darkGrey,
  },
  labelText: {
    textAlign: 'left',
    fontSize: 12,
    color: Colors.primary.darkBlue,
  },
  labelSubtitle: {
    paddingTop: 4,
    textAlign: 'left',
    fontSize: 11,
    color: Colors.primary.darkGrey,
  },
  cellText: {
    textAlign: 'right',
    fontSize: 12,
    color: Colors.primary.darkGrey,
  },
  cellNA: {
    flex: 1,
    marginLeft: -60,
    justifyContent: 'center',
  },
  tag: {
    marginLeft: -80,
  },
});
