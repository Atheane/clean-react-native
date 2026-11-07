import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants';

type IProps = {
  head: string[];
  data: string[][] | null;
  tagHeader?: string;
  tags?: string[][];
  rowLabels: string[];
  onPress: () => void;
};

export const TableConsumption = (props: IProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.column, styles.headerRow]}>
        <View style={[styles.row, { width: '100%' }]}>
          {props.head.map((header, index) => (
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
        {props.tagHeader && (
          <View style={[styles.row, styles.tagHeaderRow, styles.tag, { width: '60%' }]}>
            <Text style={styles.cellTagText}>{props.tagHeader}</Text>
          </View>
        )}
      </View>

      {props.data?.map((rowData, rowIndex) => (
        <View
          key={rowIndex}
          style={[
            styles.row,
            rowIndex === (props.data && props.data.length - 1) ? styles.lastRow : {},
            rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow,
          ]}
        >
          <View style={[styles.cell, styles.labelCell]}>
            <Text style={styles.labelText}>{props.rowLabels[rowIndex]}</Text>
          </View>
          {rowData.map((cellData, cellIndex) => (
            <View key={cellIndex} style={styles.cell}>
              <Text style={styles.cellText}>{cellData}</Text>
              {props.tags && cellIndex % 4 !== 3 && (
                <View style={styles.tag}>
                  <Text style={styles.cellTagText}>{props.tags[rowIndex][cellIndex]}</Text>
                </View>
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
    backgroundColor: Colors.primary.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: Colors.secondary.lightBlue,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tagHeaderRow: {
    backgroundColor: Colors.secondary.lightBlue,
    paddingVertical: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
    marginBottom: 10,
  },
  lastRow: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 10,
  },
  evenRow: {
    backgroundColor: Colors.primary.lightGrey,
  },
  oddRow: {
    backgroundColor: Colors.secondary.lightBlue,
  },
  cell: {
    flex: 1,
    padding: 14,
  },
  labelCell: {},
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary.darkGrey,
    fontSize: 12,
  },
  headerLeft: {},
  headerRight: {},
  labelText: {
    textAlign: 'left',
    color: Colors.primary.darkGrey,
  },
  cellText: {
    textAlign: 'center',
    color: Colors.primary.darkGrey,
  },
  cellTagText: {
    textAlign: 'center',
    color: Colors.primary.darkBlue,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tag: {
    borderRadius: 15,
    paddingVertical: 2,
    marginTop: 5,
    backgroundColor: Colors.secondary.mediumBlue,
  },
});
