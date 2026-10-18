import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Button, useTheme } from '@rneui/themed';

import { RightArrow } from '../../../assets';
import { Colors } from '../../../constants';
import { LinkButtonColors } from '../../../types';

type IProps = {
  colorOption: LinkButtonColors;
  title?: string;
  arrow?: boolean;
  iconOne?: React.FC<SvgProps>;
  pressed: boolean;
  onPress: () => void;
};

export const LinkButton: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();
  return (
    <Button type={'clear'} {...props} onPress={props.onPress}>
      <View style={[theme.bank.container.centeredItems, styles.container]}>
        {props.arrow && (
          <View style={styles.iconContainer}>
            <RightArrow
              width={27}
              height={16}
              style={{ color: getColor(props.colorOption)(props.pressed) }}
            />
          </View>
        )}
        {props.title && (
          <Text
            style={[
              theme.bank.text.link,
              {
                color: getColor(props.colorOption)(props.pressed),
              },
            ]}
          >
            {props.title}
          </Text>
        )}
        {props.iconOne && <props.iconOne />}
      </View>
    </Button>
  );
};

const getColor = (option: LinkButtonColors) => (isPressed: boolean) => {
  switch (option) {
    case LinkButtonColors.PINK:
      return isPressed ? Colors.bank.pinkTransparent : Colors.bank.secondary.pink;
    case LinkButtonColors.BLUE:
      return isPressed ? Colors.bank.primary.lightPurple : Colors.bank.primary.darkBlue;
    case LinkButtonColors.WHITE:
      return isPressed ? Colors.bank.primary.lightGrey : Colors.bank.primary.white;
    default:
      return isPressed ? Colors.bank.primary.lightGreen : Colors.bank.primary.darkGreen;
  }
};

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  iconContainer: { marginRight: 10 },
});
