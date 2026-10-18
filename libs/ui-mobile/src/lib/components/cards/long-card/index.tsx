import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

import { Colors } from '../../../constants';
import { LinkButtonColors } from '../../../types';

import { LinkButton } from '../../buttons/link-button';

type IProps = {
  text: string;
  icon: React.FC<SvgProps>;
  onPress: () => void;
};

export const LongCard = (props: IProps) => {
  const { theme } = useTheme();
  return (
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
  textContainer: { marginLeft: 30 },
  iconContainer: { position: 'absolute', right: 24 },
});
