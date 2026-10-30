import React, { FC } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Button, useTheme } from '@rneui/themed';
import { firstLetterCapitalize } from '@clean-rn/utils';
import { Colors } from '../../../constants';

type IProps = {
  title: string;
  long?: boolean;
  uppercase?: boolean;
  iconLeft?: React.FC<SvgProps>;
  loading?: boolean;
  onPress: () => void;
  disabled?: boolean;
};

const renderLabel = (text: string, long: boolean) =>
  long
    ? text.length < 26
      ? text
      : `${text}`.slice(0, 23) + '...'
    : text.length < 18
      ? text
      : `${text}`.slice(0, 15) + '...';

const ButtonContent: FC<Pick<IProps, 'iconLeft' | 'title' | 'uppercase'>> = ({
  iconLeft: IconLeft,
  title,
  uppercase,
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.contentContainer}>
      {IconLeft && (
        <View style={styles.iconLeftContainer}>
          <IconLeft />
        </View>
      )}
      <Text style={[theme.text.content, styles.content, uppercase && styles.uppercase]}>
        {renderLabel(firstLetterCapitalize(title), !!IconLeft)}
      </Text>
    </View>
  );
};

const BaseSecondaryButton: FC<IProps & { containerStyle: any; buttonStyle: any }> = ({
  long,
  loading,
  onPress,
  disabled,
  containerStyle,
  buttonStyle,
  ...contentProps
}) => (
  <View style={containerStyle}>
    <Button
      buttonStyle={buttonStyle}
      containerStyle={containerStyle}
      loading={loading ?? false}
      linearGradientProps={{
        colors: [Colors.greenGradient.lightGreen, Colors.greenGradient.darkGreen],
        start: [0, 1],
        end: [1, 0],
      }}
      onPress={onPress}
      disabled={disabled}
      raised
    >
      <ButtonContent {...contentProps} />
    </Button>
  </View>
);

const MobileSecondaryButton: FC<IProps> = (props) => {
  const { theme } = useTheme();
  const containerStyle = [
    props.long ? theme.container.button.long : theme.container.button.short,
    theme.shadow.button,
  ];
  const buttonStyle = [
    theme.shadow.button,
    styles.button,
    props.iconLeft && styles.buttonLeftIcon,
    theme.container.centeredItems,
  ];

  return <BaseSecondaryButton {...props} containerStyle={containerStyle} buttonStyle={buttonStyle} />;
};

const WebSecondaryButton: FC<IProps> = (props) => {
  const { theme } = useTheme();
  const containerStyle = [
    styles.container,
    props.long ? styles.containerLong : styles.containerShort,
    styles.webShadow,
  ];
  const buttonStyle = [styles.button, props.iconLeft && styles.buttonLeftIcon, theme.container.centeredItems];

  return <BaseSecondaryButton {...props} containerStyle={containerStyle} buttonStyle={buttonStyle} />;
};

export const SecondaryButton: FC<IProps> = Platform.OS === 'web' ? WebSecondaryButton : MobileSecondaryButton;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  containerLong: {
    width: '100%',
  },
  containerShort: {
    width: 'auto',
  },
  webShadow: {
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    borderRadius: 30,
  },
  buttonLeftIcon: {
    paddingRight: 50,
    paddingTop: 11,
    paddingBottom: 11,
  },
  button: {
    height: 55,
    paddingTop: 15,
    paddingRight: 24,
    paddingBottom: 16,
    paddingLeft: 26,
    backgroundColor: Colors.primary.white,
  },
  content: {
    color: Colors.primary.lightGreen,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeftContainer: {
    height: 32,
    alignItems: 'center',
    paddingHorizontal: 6,
    justifyContent: 'center',
    marginRight: 15,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
});
