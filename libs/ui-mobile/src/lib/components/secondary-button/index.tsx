import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Button, useTheme, Theme } from '@rneui/themed';
import { Colors } from '../../constants';
import { firstLetterCapitalize } from '../../utils';

type Props = {
  title: string;
  fixedSize?: boolean;
  uppercase?: boolean;
  iconOne?: React.FC<SvgProps>;
  disabled?: boolean;
};

type State = {
  onPress: () => void;
};

export const SecondaryButton: FC<Props & State> = (props: Props & State) => {
  const { theme } = useTheme();

  return (
    <View style={styles(props)(theme).container}>
      <Button
        style={styles(props)(theme).buttonContainer}
        buttonStyle={styles(props)(theme).button}
        raised
        onPress={props.onPress}
        disabled={props.disabled}
      >
        <View style={styles(props)(theme).contentContainer}>
          {props.iconOne && (
            <View style={styles(props)(theme).iconOneContainer}>
              <props.iconOne {...styles(props)(theme).iconOne} />
            </View>
          )}
          <View>
            <Text style={styles(props)(theme).content}>{firstLetterCapitalize(props.title)}</Text>
          </View>
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
      paddingTop: 12,
      paddingRight: 24,
      paddingBottom: 11,
      paddingLeft: 26,
      backgroundColor: Colors.background.white,
    },
    contentContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
    content: {
      lineHeight: 29,
      fontSize: 16,
      textTransform: props.uppercase ? 'uppercase' : 'none',
      color: Colors.text.lightGreenTransparent,
    },
    iconOneContainer: {
      marginRight: 15,
    },
    iconOne: {
      width: 27,
      height: 28,
      fill: Colors.icon.lightGreen,
    },
  });
