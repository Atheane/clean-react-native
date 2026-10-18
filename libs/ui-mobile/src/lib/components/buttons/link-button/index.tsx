import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Button } from '@rneui/themed';

import { RightArrow } from '../../../assets';
import { Colors, FontNames } from '../../../constants';
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
  return (
    <Button type={'clear'} {...props} onPress={props.onPress}>
      <View style={styles(props).contentContainer}>
        {props.arrow && (
          <View style={styles(props).iconContainer}>
            <RightArrow
              width={27}
              height={16}
              style={{ color: getColor(props.colorOption)(props.pressed) }}
            />
          </View>
        )}
        {props.title && <Text style={styles(props).title}>{props.title}</Text>}
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

const styles = (props: IProps) =>
  StyleSheet.create({
    contentContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
    iconContainer: { marginRight: 10 },
    title: {
      textAlign: 'left',
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: 14,
      lineHeight: 19,
      color: getColor(props.colorOption)(props.pressed),
    },
  });
