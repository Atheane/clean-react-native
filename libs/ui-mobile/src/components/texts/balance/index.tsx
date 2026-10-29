import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

import { useTheme } from '@rneui/themed';

import { RightChevron, GreenEuro } from '../../../assets';
import { Colors, NEEDS_SMALL_TEXT } from '../../../constants';

type IProps = {
  divider?: boolean;
  title: string;
  value: number;
  color: string;
  unit: string;
  onPress?: () => void;
};

export const Balance = (props: IProps) => {
  const { theme } = useTheme();

  return props.onPress ? (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={(theme.text.numberTitle, { color: props.color })}>{props.title}</Text>
      <View style={[styles.widgetContainer, theme.container.justifiedItems]}>
        <View style={theme.container.centeredItems}>
          <Text
            style={[
              theme.text.numberTitle,
              { color: props.color },
              styles.balance,
              props.unit !== '€G' && { marginTop: 8 },
            ]}
          >
            {props.value.toString().replace('.', ',')}
          </Text>
          {props.unit === '€G' && <GreenEuro />}
        </View>

        <View style={styles.linkContainer}>
          <RightChevron style={{ color: Colors.primary.white }} />
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <View>
      <Text style={(theme.text.numberTitle, { color: props.color })}>{props.title}</Text>
      <View style={[styles.widgetContainer, theme.container.justifiedItems]}>
        <View style={theme.container.centeredItems}>
          <Text style={[theme.text.numberTitle, { color: props.color }, styles.balance]}>
            {props.value.toString().replace('.', ',')}
          </Text>
          {props.unit === '€G' && <GreenEuro />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    width: Dimensions.get('window').width * 0.9,
  },
  linkContainer: {
    marginBottom: 24,
  },
  balance: {
    fontSize: NEEDS_SMALL_TEXT ? 32 : 38,
    marginTop: -6,
  },
});
