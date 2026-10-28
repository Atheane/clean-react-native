import { FC } from 'react';
import { View, Text, StyleProp, TextStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, useTheme } from '@rneui/themed';

import { firstLetterCapitalize } from '@clean-rn/utils';

type IProps = {
  title: string;
  long?: boolean;
  uppercase?: boolean;
  iconLeft?: React.FC<SvgProps>;
  iconRight?: React.FC<SvgProps>;
  loading?: boolean;
  disabled?: boolean;
  mini?: boolean;
  onPress: () => void;
};

export const PrimaryButton: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();
  const renderLabel = (text: string) => (text.length < 20 ? `${text}` : `${text}`.slice(0, 20) + '...');

  const buttonStyle = [
    theme.buttons.primary.base,
    props.long ? theme.buttons.primary.long : theme.buttons.primary.short,
    props.mini && theme.buttons.primary.mini,
  ];

  const contentStyle = [
    theme.buttons.primary.content,
    props.uppercase && { textTransform: 'uppercase' },
    props.mini && theme.buttons.primary.miniContent,
  ];

  return (
    <View
      style={[props.long ? theme.container.button.long : theme.container.button.short, theme.shadow.button]}
    >
      <Button
        ViewComponent={theme.buttons.primary.gradientColors && LinearGradient}
        buttonStyle={buttonStyle}
        containerStyle={[
          theme.shadow.button,
          props.long ? theme.container.button.long : theme.container.button.short,
        ]}
        loading={props?.loading ?? false}
        linearGradientProps={
          theme.buttons.primary.gradientColors && {
            colors: theme.buttons.primary.gradientColors,
            start: [0, 1],
            end: [1, 0],
          }
        }
        onPress={props.onPress}
        disabled={props.disabled}
        raised
        {...theme.buttons.primary.additionalProps}
      >
        <View style={theme.container.centeredItems}>
          {props.iconLeft && (
            <View style={theme.buttons.primary.iconLeftContainer}>
              <props.iconLeft />
            </View>
          )}

          <Text style={contentStyle as StyleProp<TextStyle>}>
            {renderLabel(firstLetterCapitalize(props.title))}
          </Text>
          {props.iconRight && (
            <View style={theme.buttons.primary.iconRightContainer}>
              <props.iconRight />
            </View>
          )}
        </View>
      </Button>
    </View>
  );
};
