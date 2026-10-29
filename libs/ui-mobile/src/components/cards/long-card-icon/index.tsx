import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { useTheme } from '@rneui/themed';

import { Colors } from '../../../constants';

type IProps = {
  text: string;
  rightIcon: React.FC<SvgProps>;
  leftIcon: React.FC<SvgProps>;
  onPress: () => void;
};

export const LongCardIcon = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.4}
      style={[theme.shadow.card, theme.container.card.long, { justifyContent: 'center' }]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {props.leftIcon && (
          <View style={styles.leftChevronContainer}>
            <props.leftIcon />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={theme.text.boldDarkBlue}>{props.text}</Text>
        </View>
        {props.rightIcon && (
          <View style={styles.rightChevronContainer}>
            <props.rightIcon />
          </View>
        )}
      </View>
    </TouchableOpacity>
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
  leftChevronContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  rightChevronContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 20,
  },
  textContainer: { marginLeft: 30, marginVertical: 14 },
  iconContainer: { position: 'absolute', right: 12 },
});
