import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Card, useTheme } from '@rneui/themed';

import { LinkButton } from '../../buttons/link-button';
import { Colors } from '../../../constants';
import { LinkButtonColors } from '../../../types';

type IProps = {
  icon: React.FC<SvgProps>;
  text: string;
  pressable?: boolean;
  onPress: () => void;
};

export const LongCard = (props: IProps) => {
  const { theme } = useTheme();

  return props.pressable ? (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.4}
      style={[theme.bank.shadow.card, theme.bank.container.card.long, { justifyContent: 'center' }]}
    >
      <View>
        <View style={styles.textContainer}>
          <Text style={theme.bank.text.cyan}>{props.text}</Text>
        </View>
        {props.icon && (
          <View style={[styles.iconContainer, { top: 8, right: 24 }]}>
            <props.icon />
          </View>
        )}
      </View>
    </TouchableOpacity>
  ) : (
    <View style={[styles.container, theme.bank.shadow.card, theme.bank.container.card.long]}>
      <View style={styles.textContainer}>
        <Text style={theme.bank.text.cyan}>{props.text}</Text>
      </View>
      {props.icon && (
        <View style={styles.iconContainer}>
          <LinkButton
            pressed={false}
            onPress={props.onPress}
            iconOne={props.icon}
            colorOption={LinkButtonColors.BLUE}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: Colors.bank.primary.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer: {
    marginLeft: 16,
  },
  textContainer: { marginLeft: 30, marginVertical: 14 },
  iconContainer: { position: 'absolute', right: 12, top: 0 },
});
