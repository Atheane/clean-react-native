import { FC } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

type IProps = {
  data?: { pct: string; co2: string; legend: string };
  icon: React.FC<SvgProps>;
  onPress: () => void;
};

export const TouchCardKpi: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[theme.bank.shadow.card, theme.bank.container.card.kpi]}>
        <View
          style={[
            styles.rowContainer,
            props.data ? theme.bank.container.centeredItems : { position: 'relative', left: 2, top: 12 },
          ]}
        >
          <props.icon />
          {props.data && (
            <View style={theme.bank.container.centeredItem}>
              <Text style={theme.bank.text.kpi}>{props.data.pct}</Text>
              <Text style={[styles.subtitleContainer, theme.bank.text.subtitle]}>{props.data.co2}</Text>
            </View>
          )}
        </View>
        {props.data && <Text style={theme.bank.text.legend}>{props.data.legend}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    marginLeft: 16,
  },
  subtitleContainer: {
    marginVertical: -6,
    marginLeft: 8,
  },
});
