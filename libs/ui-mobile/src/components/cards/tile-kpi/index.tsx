import { FC } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';
import { Colors } from '../../../constants';

type IProps = {
  data: { kpi: string; unit: string; legend: string; color?: string };
  icon: React.FC<SvgProps>;
};

export const TileKpi: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();
  const color = props.data.color ? { color: props.data.color } : null;
  return (
    <View style={theme.container.card.tile}>
      <View style={[styles.rowContainer, { flex: 2 }]}>
        <props.icon />
        {props.data.kpi.length <= 2 ? (
          // Une seule ligne si KPI <= 2 caractères
          <Text style={[theme.text.kpi, styles.kpiText, color]}>{`${props.data.kpi}${props.data.unit}`}</Text>
        ) : (
          // Deux lignes si KPI > 2 caractères
          <View style={{ alignItems: 'center' }}>
            <Text style={[theme.text.kpi, styles.kpiText, color]}>{props.data.kpi}</Text>
            <Text style={[theme.text.kpi, styles.unitText, color]}>{props.data.unit}</Text>
          </View>
        )}
      </View>
      <Text style={[theme.text.legend, styles.textLegend]}>{props.data.legend}</Text>
    </View>
  );
};
const kpiSize = Platform.OS === 'web' ? 64 : 20;
const unitSize = Platform.OS === 'web' ? 24 : 12;
const legendSize = Platform.OS === 'web' ? 20 : 10;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  kpiText: {
    color: Colors.primary.lightGreen,
    fontSize: kpiSize,
    lineHeight: kpiSize + 4,
    fontWeight: 'bold',
  },
  unitText: {
    color: Colors.primary.lightGreen,
    fontSize: unitSize,
    lineHeight: unitSize + 1,
    fontWeight: 'bold',
  },
  textLegend: {
    color: Colors.primary.grey,
    fontSize: legendSize,
    lineHeight: legendSize + 1,
    fontWeight: 'bold',
    marginTop: -8,
  },
});
