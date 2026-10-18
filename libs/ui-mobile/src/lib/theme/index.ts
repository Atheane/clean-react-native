import '@rneui/themed';
import { Dimensions, StyleProp, TextStyle } from 'react-native';
import { createTheme } from '@rneui/themed';
import { FontNames, Colors } from '../constants';

export const DefaultTheme = {
  dark: false,
  colors: {
    ...Colors.bank,
  },
};

declare module '@rneui/themed' {
  export interface Theme {
    shadow: {
      color: string;
      opacity: number;
      offset: {
        width: number;
        height: number;
      };
      width: number;
      radius: number;
    };
    linearGradient: {
      start: string;
      end: string;
    };
    label: StyleProp<TextStyle>;
    errors: StyleProp<TextStyle>;
    instructionText: StyleProp<TextStyle>;
    input: {
      text: StyleProp<TextStyle>;
      container: StyleProp<TextStyle>;
      leftIconContainer: StyleProp<TextStyle>;
      label: StyleProp<TextStyle>;
      subContainer: StyleProp<TextStyle>;
    };
  }
}

export const theme = createTheme({
  components: {
    Button: {
      titleStyle: {
        textTransform: 'uppercase',
        fontFamily: FontNames.MartelSans_600SemiBold,
        fontSize: 18,
        lineHeight: 24,
        marginLeft: 10,
      },
      radius: 28,
    },
  },
  shadow: {
    color: Colors.bank.shadow,
    opacity: 0.34,
    offset: { width: 5, height: 15 },
    radius: 20,
  },
  linearGradient: {
    start: Colors.bank.greenGradient.lightGreen,
    end: Colors.bank.greenGradient.darkGreen,
  },
  label: {
    textTransform: 'uppercase',
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 21,
    lineHeight: 21,
    textAlign: 'left',
    marginBottom: 25,
  },
  errors: {
    color: Colors.bank.secondary.salmon,
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 12,
    textAlign: 'center',
  },
  instructionText: {
    width: '80%',
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'center',
    fontFamily: FontNames.Roboto_400Regular,
    color: Colors.bank.primary.darkGrey,
  },
  input: {
    text: {
      color: Colors.bank.secondary.pink,
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: 14,
    },
    container: {
      width: Dimensions.get('window').width * 0.8,
      backgroundColor: Colors.bank.primary.lightGrey,
      borderRadius: 8,
    },
    leftIconContainer: {
      marginHorizontal: 10,
    },
    label: {
      textTransform: 'uppercase',
      fontFamily: FontNames.Roboto_700Bold,
      fontSize: 16,
      color: Colors.bank.primary.grey,
      lineHeight: 21,
      textAlign: 'left',
      marginBottom: 8,
    },
    subContainer: {
      borderBottomColor: 'transparent',
      marginTop: 10,
      marginBottom: -15, // override of default input bottomMargin
    },
  },
});
