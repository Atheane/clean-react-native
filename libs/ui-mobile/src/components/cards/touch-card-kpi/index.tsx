import { FC } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';
import { NEEDS_SMALL_TEXT } from '../../../constants';

type IProps = {
  data?: { pct?: string; co2?: string; legend?: string; text?: string };
  icon: React.FC<SvgProps>;
  onPress: () => void;
};

const KPI_CARD_RATIO = 112 / 174;

export const TouchCardKpi: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[theme.container.card.kpi, Platform.OS === 'web' ? styles.webShadow : theme.shadow.card]}
    >
      <View style={[Platform.OS === 'web' ? styles.webContainer : styles.rowContainer]}>
        <props.icon />
        {props.data && props.data.pct && props.data.co2 && (
          <View
            style={[
              theme.container.centeredItem,
              Platform.OS === 'web' ? styles.webKpiContainer : styles.kpiContainer,
            ]}
          >
            <Text style={[theme.text.kpi]}>{props.data.pct}</Text>
            <Text style={[theme.text.subtitle]}>{props.data.co2}</Text>
          </View>
        )}
      </View>
      {props.data && props.data.legend && (
        <View style={Platform.OS !== 'web' && styles.legendContainer}>
          <Text style={theme.text.legend}>{props.data.legend}</Text>
        </View>
      )}
      {props.data && props.data.text && (
        <View style={Platform.OS === 'web' ? styles.webTextContainer : styles.textContainer}>
          <Text
            style={[
              theme.text.darkBlue,
              NEEDS_SMALL_TEXT ? { fontSize: 10, lineHeight: 16 } : { fontSize: 12, lineHeight: 18 },
            ]}
          >
            {props.data.text}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    margin: 14,
    flexDirection: 'row',
  },
  webContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webShadow: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 500,
    minHeight: Dimensions.get('window').width * 0.9 * KPI_CARD_RATIO * 0.5,
  },
  kpiContainer: { marginTop: -12, marginLeft: 14 },
  webKpiContainer: { marginTop: 12, marginLeft: 14 },
  legendContainer: { marginTop: -24 },
  textContainer: { marginTop: 8 },
  webTextContainer: { alignItems: 'center' },
});
