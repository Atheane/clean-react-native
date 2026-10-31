import React, { FC } from 'react';
import { View, Text, StyleProp, TextStyle, Platform, StyleSheet } from 'react-native';
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

export const PrimaryButton: FC<IProps> = (props) => {
  const { theme } = useTheme();
  const isWeb = Platform.OS === 'web';

  const renderLabel = (text: string) => (text.length < 20 ? text : `${text.slice(0, 20)}...`);

  const buttonStyle = [
    isWeb && styles.button,
    theme.buttons.primary.base,
    props.long ? theme.buttons.primary.long : theme.buttons.primary.short,
    isWeb
      ? (props.mini && { ...styles.container, height: 36 }) || { ...styles.container }
      : props.mini && theme.buttons.primary.mini,
  ];

  const contentStyle = [
    isWeb && styles.content,
    theme.buttons.primary.content,
    props.uppercase && (isWeb ? styles.uppercase : { textTransform: 'uppercase' }),
    isWeb ? styles.container : props.mini && theme.buttons.primary.miniContent,
  ];

  const containerStyle = [
    isWeb ? styles.container : theme.container.button[props.long ? 'long' : 'short'],
    isWeb ? (props.long ? styles.containerLong : styles.containerShort) : null,
    isWeb ? styles.webShadow : theme.shadow.button,
  ];

  return (
    <View style={containerStyle}>
      <Button
        ViewComponent={theme.buttons.primary.gradientColors && LinearGradient}
        buttonStyle={buttonStyle}
        containerStyle={containerStyle}
        loading={props.loading ?? false}
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
        <View style={isWeb ? styles.contentContainer : theme.container.centeredItems}>
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

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
  },
  containerLong: {
    width: '100%',
  },
  containerShort: {
    width: 'auto',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  webShadow: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: 30,
  },
});

export default PrimaryButton;
