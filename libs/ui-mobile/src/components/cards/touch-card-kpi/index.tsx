import { FC } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';
import { NEEDS_SMALL_TEXT } from '../../../constants';

type IProps = {
  data?: { pct?: string; co2?: string; legend?: string; text?: string };
  icon: React.FC<SvgProps>;
  onPress: () => void;
};

export const TouchCardKpi: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={props.onPress} style={[theme.shadow.card, theme.container.card.kpi]}>
      <View
        style={[
          styles.rowContainer,
          props.data && props.data.pct && props.data.co2
            ? theme.container.leftItems
            : { position: 'relative', left: 0, top: 12 },
        ]}
      >
        <props.icon />
        {props.data && props.data.pct && props.data.co2 && (
          <View style={[theme.container.centeredItem, { marginLeft: 12 }]}>
            <View style={theme.container.leftItems}>
              <Text style={[theme.text.kpi]}>{props.data.pct}</Text>
            </View>
            <View style={theme.container.leftItems}>
              <Text style={[styles.subtitleContainer, theme.text.subtitle]}>{props.data.co2}</Text>
            </View>
          </View>
        )}
      </View>
      {props.data && props.data.legend && (
        <View style={theme.container.leftItems}>
          <Text style={[theme.text.legend]}>{props.data.legend}</Text>
        </View>
      )}
      {props.data && props.data.text && (
        <View style={styles.textContainer}>
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
    marginLeft: 14,
  },
  subtitleContainer: {
    marginVertical: -6,
    marginLeft: 8,
  },
  textContainer: {
    marginTop: 30,
    marginLeft: 12,
  },
});
