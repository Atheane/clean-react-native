import { FC } from 'react';
import { View, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Button, useTheme } from '@rneui/themed';

import { RightArrow } from '../../../assets';
import { Colors } from '../../../constants';
import { LinkButtonColors } from '../../../types';

type IProps = {
  colorOption?: LinkButtonColors;
  title?: string;
  arrow?: boolean;
  iconLeft?: React.FC<SvgProps>;
  iconRight?: React.FC<SvgProps>;
  onPress: () => void;
  inline?: StyleProp<TextStyle>;
  disabled?: boolean;
};

export const LinkButton: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();
  return (
    <Button
      type={'clear'}
      {...props}
      onPress={props.onPress}
      containerStyle={props.disabled ? { opacity: 0.3, margin: 0 } : { margin: 0 }}
      disabled={props.disabled}
    >
      {props.inline ? (
        props.title && <Text style={props.inline}>{props.title}</Text>
      ) : (
        <View style={[theme.container.centeredItems, styles.container]}>
          {props.iconLeft && (
            <props.iconLeft style={props.colorOption ? { color: getColor(props.colorOption) } : {}} />
          )}
          {props.arrow && (
            <View style={styles.iconContainer}>
              <RightArrow
                width={27}
                height={16}
                color={(props.colorOption && getColor(props.colorOption)) as string}
              />
            </View>
          )}
          {props.title && (
            <Text
              style={[
                theme.text.link,
                props.colorOption
                  ? {
                      color: getColor(props.colorOption),
                    }
                  : {},
              ]}
            >
              {props.title}
            </Text>
          )}
          {props.iconRight && (
            <props.iconRight
              style={(props.colorOption && { color: getColor(props.colorOption) }) as StyleProp<ViewStyle>}
            />
          )}
        </View>
      )}
    </Button>
  );
};

const getColor = (option: LinkButtonColors) => {
  switch (option) {
    case LinkButtonColors.PINK:
      return Colors.secondary.pink;
    case LinkButtonColors.BLUE:
      return Colors.primary.darkBlue;
    case LinkButtonColors.WHITE:
      return Colors.primary.white;
    default:
      return Colors.primary.darkGreen;
  }
};

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  iconContainer: { marginRight: 10 },
  iconLeft: { marginRight: 10 },
});
