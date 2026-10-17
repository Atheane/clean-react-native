import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, ButtonProps, useTheme, Theme } from '@rneui/themed';
import { Colors } from '../../constants';
import { firstLetterCapitalize } from '../../utils';

type Props = {
  title: string;
  fixedSize?: boolean;
  uppercase?: boolean;
  iconOne?: React.FunctionComponent<SvgProps>;
  iconTwo?: React.FunctionComponent<SvgProps>;
};

type State = {
  loading?: boolean;
  pressed: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export const PrimaryButton: FC<ButtonProps & Props & State> = (props: ButtonProps & Props & State) => {
  const { theme } = useTheme();

  return (
    <View style={styles(props)(theme).container}>
      <Button
        ViewComponent={LinearGradient}
        style={styles(props)(theme).buttonContainer}
        buttonStyle={styles(props)(theme).button}
        raised={!props.pressed}
        loading={props?.loading ? props.loading : false}
        linearGradientProps={{
          colors: [theme.linearGradient.start, theme.linearGradient.end],
          start: [0, 1],
          end: [1, 0],
        }}
        onPress={props.onPress}
        disabled={props.disabled}
      >
        <View style={styles(props)(theme).contentContainer}>
          {props.iconOne && (
            <View style={styles(props)(theme).iconOneContainer}>
              <props.iconOne {...styles(props)(theme).icon} />
            </View>
          )}
          <Text style={styles(props)(theme).content}>{firstLetterCapitalize(props.title)}</Text>
          {props.iconTwo && (
            <View style={styles(props)(theme).iconTwoContainer}>
              <props.iconTwo {...styles(props)(theme).icon} />
            </View>
          )}
        </View>
      </Button>
    </View>
  );
};

const styles = (props: Props & State) => (theme: Theme) =>
  StyleSheet.create({
    container: props.fixedSize
      ? {
          width: 309,
          height: 55,
        }
      : {
          flexDirection: 'row',
        },
    buttonContainer: {
      shadowColor: theme.shadow.color, // IOS
      shadowOffset: theme.shadow.offset, // IOS
      shadowOpacity: theme.shadow.opacity,
      shadowRadius: theme.shadow.radius,
      elevation: 1, // android,
    },
    button: {
      paddingTop: 15,
      paddingRight: 24,
      paddingBottom: 16,
      paddingLeft: 26,
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    content: {
      lineHeight: 24,
      fontSize: 18,
      textTransform: props.uppercase ? 'uppercase' : 'none',
      color: props.pressed ? Colors.text.whiteTransparent : Colors.text.white,
    },
    iconOneContainer: {
      marginRight: 15,
    },
    iconTwoContainer: {
      position: 'relative',
      left: props.fixedSize ? 90 : 40,
    },
    icon: {
      width: 22,
      height: 23,
      fill: props.pressed ? Colors.text.whiteTransparent : Colors.text.white,
    },
  });
