import { FC } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Button, useTheme, Theme } from '@rneui/themed';
import { Colors, FontNames } from '../../constants';
import { firstLetterCapitalize } from '../../utils';

type IProps = {
  title: string;
  large?: boolean;
  uppercase?: boolean;
  iconOne?: React.FC<SvgProps>;
  loading?: boolean;
  onPress: () => void;
  disabled?: boolean;
};

export const SecondaryButton: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles(props)(theme).container}>
      <Button
        style={styles(props)(theme).buttonContainer}
        buttonStyle={styles(props)(theme).button}
        loading={props?.loading ?? false}
        onPress={props.onPress}
        disabled={props.disabled}
        raised
      >
        <View style={styles(props)(theme).contentContainer}>
          {props.iconOne && (
            <View style={styles(props)(theme).iconContainer}>
              <props.iconOne {...styles(props)(theme).icon} />
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
      shadowColor: theme.shadow.color, // iOS
      shadowOffset: theme.shadow.offset, // iOS
      shadowOpacity: theme.shadow.opacity, // iOS
      shadowRadius: theme.shadow.radius, // iOS
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
      fontFamily: FontNames.Roboto_700Bold,
    },
    iconContainer: {
      marginRight: 15,
    },
    icon: {
      width: 27,
      height: 28,
    },
  });
