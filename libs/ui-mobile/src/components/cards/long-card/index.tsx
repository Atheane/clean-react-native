import { Text, StyleSheet, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
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

const LONG_CARD_RATIO = 85 / 356;

export const LongCard = (props: IProps) => {
  const { theme } = useTheme();

  const containerStyle = [
    styles.container,
    theme.shadow.card,
    theme.container.card.long,
    Platform.OS === 'web' && styles.webContainer,
  ];

  return props.pressable ? (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.4} style={containerStyle}>
      <View style={styles.textContainer}>
        <Text style={theme.text.cyan}>{props.text}</Text>
      </View>
      {props.icon && (
        <View style={styles.chevronContainer}>
          <props.icon />
        </View>
      )}
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
    justifyContent: 'space-between',
  },
  webContainer: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 500,
    minHeight: Dimensions.get('window').width * 0.9 * LONG_CARD_RATIO * 0.5,
  },
  rowContainer: {
    marginLeft: 16,
  },
  chevronContainer: { position: 'absolute', right: 20 },
  textContainer: { marginLeft: 30, marginVertical: 14 },
  iconContainer: { position: 'absolute', right: 12 },
});
