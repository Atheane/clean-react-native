import { FC } from 'react';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme, Skeleton } from '@rneui/themed';
import { Colors } from '../../../constants';
import { LinearGradient } from 'expo-linear-gradient';

type IProps = {
  data: { kpi?: string; unit: string; legend: string; color?: string };
  icon: React.FC<SvgProps>;
  loading?: boolean;
};

const TILE_KPI_CARD_RATIO = 76 / 103;

export const TileKpi: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();
  const color = props.data.color ? { color: props.data.color } : null;
  return props.loading || !props.data.kpi ? (
    <Skeleton
      LinearGradientComponent={LinearGradient}
      animation="pulse"
      style={[styles.tileContainer, Platform.OS === 'web' && styles.webTileContainer]}
    />
  ) : (
    <View style={[theme.container.card.tile, Platform.OS === 'web' && styles.webTileContainer]}>
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
      <Text style={[theme.text.legend, styles.textLegend, Platform.OS === 'web' && { paddingBottom: 10 }]}>
        {props.data.legend}
      </Text>
    </View>
  );
};
const kpiSize = Platform.OS === 'web' ? 44 : 20;
const unitSize = Platform.OS === 'web' ? 24 : 12;
const legendSize = Platform.OS === 'web' ? 20 : 10;

const styles = StyleSheet.create({
  tileContainer: {
    width: Dimensions.get('window').width * 0.26,
    height: Dimensions.get('window').width * 0.26 * TILE_KPI_CARD_RATIO,
    marginHorizontal: 4,
    backgroundColor: Colors.primary.lightGrey,
    borderRadius: 12,
  },
  webTileContainer: {
    width: 350, // Largeur fixe sur web
    minWidth: 350,
  },
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
