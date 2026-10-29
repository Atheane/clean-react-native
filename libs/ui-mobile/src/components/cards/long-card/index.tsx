import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { useTheme } from '@rneui/themed';

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
      style={[theme.shadow.card, theme.container.card.long, { justifyContent: 'center' }]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.textContainer}>
          <Text style={theme.text.cyan}>{props.text}</Text>
        </View>
        {props.icon && (
          <View style={styles.chevronContainer}>
            <props.icon />
          </View>
        )}
      </View>
    </TouchableOpacity>
  ) : (
    <View style={[styles.container, theme.shadow.card, theme.container.card.long]}>
      <View style={styles.textContainer}>
        <Text style={theme.text.cyan}>{props.text}</Text>
      </View>
      {props.icon && (
        <View style={styles.iconContainer}>
          <LinkButton onPress={props.onPress} iconRight={props.icon} colorOption={LinkButtonColors.BLUE} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: Colors.primary.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer: {
    marginLeft: 16,
  },
  chevronContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 20,
  },
  textContainer: { marginLeft: 30, marginVertical: 14 },
  iconContainer: { position: 'absolute', right: 12 },
});
