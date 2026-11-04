import { Text, StyleSheet, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { useTheme } from '@rneui/themed';

type IProps = {
  text: string;
  rightIcon: React.FC<SvgProps>;
  leftIcon: React.FC<SvgProps>;
  onPress: () => void;
  children?: React.ReactElement;
};

const LONG_CARD_RATIO = 85 / 356;

export const LongCardIcon = (props: IProps) => {
  const { theme } = useTheme();

  const containerStyle = [
    theme.shadow.card,
    theme.container.card.long,
    { justifyContent: 'center' },
    Platform.OS === 'web' && styles.webContainer,
  ];

  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.4} style={containerStyle}>
      <View style={Platform.OS === 'web' ? { justifyContent: 'space-around' } : { alignItems: 'center' }}>
        <View style={styles.rowContainer}>
          {props.leftIcon && (
            <View style={styles.leftChevronContainer}>
              <props.leftIcon />
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={[theme.text.boldDarkBlue]}>{props.text}</Text>
          </View>
          {props.rightIcon && (
            <View style={styles.rightChevronContainer}>
              <props.rightIcon />
            </View>
          )}
        </View>
        {props.children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 500,
    minHeight: Dimensions.get('window').width * 0.9 * LONG_CARD_RATIO * 0.5,
  },
  rowContainer: { flexDirection: 'row', alignItems: 'center' },
  leftChevronContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  rightChevronContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 15,
  },
  textContainer: { marginLeft: 30, marginVertical: 14, padding: 0 },
  iconContainer: { position: 'absolute', right: 12 },
});
