import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, ButtonProps } from '@rneui/themed';
import { Colors } from '../../constants';
// import { firstLetterCapitalize } from '@shared/presentation/utils';

type Props = {
  title: string;
  fixedSize?: boolean;
  uppercase?: boolean;
  iconOne?: React.FC<SvgProps>;
  iconTwo?: React.FC<SvgProps>;
};

type State = {
  loading?: boolean;
  pressed: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export const PrimaryButton: FC<ButtonProps & Props & State> = (props: ButtonProps & Props & State) => {

  return (
    <View style={styles(props).container}>
      <Button
        ViewComponent={LinearGradient}
        style={styles(props).buttonContainer}
        buttonStyle={styles(props).button}
        raised={!props.pressed}
        loading={props?.loading ? props.loading : false}
        linearGradientProps={{
          colors: [Colors.background.lightGreen, Colors.background.darkGreen],
          start: [0, 1],
          end: [1, 0],
        }}
        onPress={props.onPress}
        disabled={props.disabled}
      >
        <View style={styles(props).contentContainer}>
          {props.iconOne && (
            <View style={styles(props).iconOneContainer}>
              <props.iconOne {...styles(props).icon} />
            </View>
          )}
          <Text style={styles(props).content}>{props.title}</Text>
          {/* <Text style={styles(props).content}>{firstLetterCapitalize(props.title)}</Text> */}
          {props.iconTwo && (
            <View style={styles(props).iconTwoContainer}>
              <props.iconTwo {...styles(props).icon} />
            </View>
          )}
        </View>
      </Button>
    </View>
  );
};

const styles = (props: Props & State) =>
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
      color: Colors.shadow.bold,
      opacity: 0.34,
      offset: { width: 5, height: 15 },
      radius: 20,
      width: 260,
      elevation: 1, // android,
    },
    button: {
      paddingTop: 15,
      paddingRight: 24,
      paddingBottom: 16,
      paddingLeft: 26,
    },
    contentContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
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
