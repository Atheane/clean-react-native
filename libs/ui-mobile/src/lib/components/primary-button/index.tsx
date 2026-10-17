import { FC } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, useTheme, Theme } from '@rneui/themed';
import { Colors, FontNames } from '../../constants';
import { firstLetterCapitalize } from '../../utils';

type IProps = {
  title: string;
  large?: boolean;
  uppercase?: boolean;
  iconOne?: React.FC<SvgProps>;
  iconTwo?: React.FC<SvgProps>;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export const PrimaryButton: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles(props)(theme).container}>
      <Button
        ViewComponent={LinearGradient}
        style={styles(props)(theme).buttonContainer}
        buttonStyle={styles(props)(theme).button}
        loading={props?.loading ?? false}
        linearGradientProps={{
          colors: [theme.linearGradient.start, theme.linearGradient.end],
          start: [0, 1],
          end: [1, 0],
        }}
        onPress={props.onPress}
        disabled={props.disabled}
        raised
      >
        <View style={styles(props)(theme).contentContainer}>
          {props.iconOne && (
            <View style={styles(props)(theme).iconOneContainer}>
              <props.iconOne />
            </View>
          )}
          <Text style={styles(props)(theme).content}>{firstLetterCapitalize(props.title)}</Text>
          {props.iconTwo && (
            <View style={styles(props)(theme).iconTwoContainer}>
              <props.iconTwo />
            </View>
          )}
        </View>
      </Button>
    </View>
  );
};

const styles = (props: IProps) => (theme: Theme) =>
  StyleSheet.create({
    container: props.large
      ? {
          width: Dimensions.get('window').width * 0.8,
          height: 55,
        }
      : {
          flexDirection: 'row',
        },
    buttonContainer: {
      backgroundColor: Colors.background.white,
      shadowColor: theme.shadow.color, // iOS
      shadowOffset: theme.shadow.offset, // iOS
      shadowOpacity: theme.shadow.opacity, // iOS
      shadowRadius: theme.shadow.radius, // iOS
      elevation: 1, // android,
      borderRadius: 50,
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
      color: Colors.text.white,
      fontFamily: FontNames.Roboto_700Bold,
    },
    iconOneContainer: {
      marginRight: 15,
    },
    iconTwoContainer: {
      marginLeft: 15,
    },
  });
