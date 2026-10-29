import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { arrayIsEmpty } from '@clean-rn/utils';

import { Colors } from '../../../constants';
import { PrimaryButton } from '../../buttons/primary-button';
import { Tag } from '../../tags';

type IProps = {
  tableHead: string[];
  tableData: string[][];
  rowLabels: string | React.ReactNode[];
  onPress: () => void;
  buttonTitle: string;
  tagText: string;
  baselineText: string;
};

const TableData = (props: IProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.headerRow]}>
        <View style={[styles.cell, styles.labelCell]}>
          <Text style={styles.headerText}></Text>
        </View>
        {props.tableHead.map((header, index) => (
          <View key={index} style={styles.cell}>
            {index === 0 && <Text style={[styles.headerText, { color: Colors.primary.grey }]}>{header}</Text>}
            {index === 1 && (
              <Text style={[styles.headerText, { color: Colors.secondary.purple }]}>{header}</Text>
            )}
            {index === 2 && <Text style={[styles.headerText]}>{header}</Text>}
            {index === 3 && (
              <Text style={[styles.headerText, { color: Colors.primary.lightGreen }]}>{header}</Text>
            )}
          </View>
        ))}
      </View>
      {props.tableData.map((rowData, rowIndex) => (
        <View
          key={rowIndex}
          style={[
            styles.row,
            rowIndex % 2 === 0 ? (rowIndex === 0 ? styles.firstRow : styles.evenRow) : styles.oddRow,
          ]}
        >
          {rowIndex === 0 && (
            <View style={[styles.cell, styles.labelCell]}>
              <Text style={[styles.labelText, styles.firstRow]}>{props.baselineText}</Text>
              <Text style={[styles.labelSubtitle, styles.firstRow]}>{props.rowLabels[rowIndex]}</Text>
            </View>
          )}
          {rowIndex !== 0 && (
            <View style={[styles.cell, styles.labelCell]}>
              <Text style={styles.labelText}>{props.rowLabels[rowIndex]}</Text>
            </View>
          )}
          {rowData.map((cellData, cellIndex) => (
            <View key={cellIndex} style={styles.cell}>
              {rowIndex === 0 && cellIndex < 3 && (
                <Text style={[styles.cellText, styles.firstRow]}>{cellData}</Text>
              )}
              {rowIndex === 0 && cellIndex === 3 && (
                <Text style={[styles.cellText, styles.firstRow, { textAlign: 'center' }]}>-</Text>
              )}
              {rowIndex > 0 && cellIndex % 4 === 0 && (
                <Text style={[styles.cellText, { color: Colors.primary.grey }]}>{cellData}</Text>
              )}
              {rowIndex > 0 && cellIndex % 4 === 1 && (
                <Text style={[styles.cellText, { color: Colors.secondary.purple }]}>{cellData}</Text>
              )}
              {rowIndex > 0 && cellIndex % 4 === 2 && <Text style={styles.cellText}>{cellData}</Text>}
              {rowIndex > 0 && cellIndex % 4 === 3 && (
                <Text style={[styles.cellText, { color: Colors.primary.lightGreen, textAlign: 'center' }]}>
                  {cellData}
                </Text>
              )}
            </View>
          ))}
          {arrayIsEmpty(rowData) && (
            <View style={[styles.emptyRow]}>
              <Tag color={Colors.primary.lightGrey} text={props.tagText} />
              <PrimaryButton title={props.buttonTitle} onPress={props.onPress} mini />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const TableNoData = (props: IProps) => (
  <TableData
    tableHead={props.tableHead}
    tableData={[
      ['-', '-', '-', '-'],
      ['-', '-', '-', '-'],
      ['-', '-', '-', '-'],
      ['-', '-', '-', '-'],
    ]}
    rowLabels={['', 'Année 1', 'Année 2', 'Année 3']}
    buttonTitle={props.buttonTitle}
    tagText={props.tagText}
    baselineText={props.baselineText}
    onPress={props.onPress}
  />
);

export const TableCO2Baseline = (props: IProps) => {
  if (arrayIsEmpty(props.tableData)) return <TableNoData {...props} />;
  else return <TableData {...props} />;
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
    fontSize: 10,
    color: Colors.primary.darkGrey,
  },
  cellText: {
    textAlign: 'right',
    fontSize: 12,
    color: Colors.primary.darkGrey,
  },
  tag: {
    marginLeft: -80,
  },
  firstRow: {
    color: Colors.primary.white,
    backgroundColor: Colors.primary.grey, // Changez la couleur de fond ici
  },
  emptyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
