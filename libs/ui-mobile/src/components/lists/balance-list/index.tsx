import { StyleSheet, Text, View } from 'react-native';
import { Divider } from '@rneui/base';
import { useTheme } from '@rneui/themed';

import { Balance } from '../../texts/balance';

type IProps = {
  noDataLabel: string;
  onPress: (data: { uid: string; value: number; title: string; color: string }) => void;
  data: { uid: string; value: number; title: string; unit: string }[];
  color: string;
};

export const BalanceList = (props: IProps) => {
  const { theme } = useTheme();
  return (
    <View>
      {props.data.length > 0 ? (
        props.data.map((item: { uid: string; value: number; title: string; unit: string }) => (
          <View key={item.uid} style={styles.widgetContainer}>
            <Balance
              value={item.value}
              onPress={() => props.onPress(item)}
              divider
              title={item.title}
              color={props.color}
              unit={item.unit}
            />
            <View style={styles.divider}>
              <Divider color={'rgba(255, 255, 255, 0.3)'} />
            </View>
          </View>
        ))
      ) : (
        <Text style={theme.text.numberTitle}>{props.noDataLabel}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    marginTop: 8,
  },
  divider: {
    width: '90%',
  },
});
