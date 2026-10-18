import '@rneui/themed';
import { Dimensions, StyleProp, TextStyle, ViewStyle } from 'react-native';
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
    bank: {
      container: {
        centered: StyleProp<ViewStyle>;
        card: {
          short: {
            width: number;
            height: number;
            margin: number;
            borderRadius: number;
          };
          long: {
            width: number;
            height: number;
            margin: number;
            borderRadius: number;
          };
        };
        input: StyleProp<ViewStyle>;
      };
      shadow: {
        color: string;
        opacity: number;
        offset: {
          width: number;
          height: number;
        };
        radius: number;
      };
      text: {
        button: StyleProp<TextStyle>;
        pinkLabel: StyleProp<TextStyle>;
        greyLabel: StyleProp<TextStyle>;
        kpi: StyleProp<TextStyle>;
        subtitle: StyleProp<TextStyle>;
        legend: StyleProp<TextStyle>;
        darkBlue: StyleProp<TextStyle>;
        boldDarkBlue: StyleProp<TextStyle>;
        grey: StyleProp<TextStyle>;
        input: StyleProp<TextStyle>;
        errors: StyleProp<TextStyle>;
        white: StyleProp<TextStyle>;
      };
    };
  }
}

const CARD_WIDTH = Dimensions.get('window').width * 0.5;
const CARD_RATIO = 168 / 228;

export const theme = createTheme({
  components: {
    Button: {
      radius: 28, // todo find a way to put it in common bank button style
    },
  },
  bank: {
    container: {
      centered: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
      card: {
        short: {
          width: Dimensions.get('window').width * 0.45,
          height: CARD_WIDTH * CARD_RATIO,
          margin: 16,
          borderRadius: 16,
        },
        long: {
          width: Dimensions.get('window').width * 0.85,
          height: 85,
          borderRadius: 20,
        },
      },
      input: {
        width: Dimensions.get('window').width * 0.8,
        backgroundColor: Colors.bank.primary.lightGrey,
        borderRadius: 8,
        marginTop: 11,
        marginBottom: -16, // override of default input bottomMargin
        borderBottomWidth: 0,
      },
    },
    shadow: {
      color: Colors.bank.shadow,
      opacity: 0.34,
      offset: { width: 5, height: 15 },
      radius: 20,
    },
    text: {
      button: {
        lineHeight: 24,
        fontSize: 18,
        fontFamily: FontNames.Roboto_700Bold,
      },
      pinkLabel: {
        textTransform: 'uppercase',
        color: Colors.bank.secondary.pink,
        fontFamily: FontNames.Roboto_700Bold,
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'left',
        marginBottom: 16,
      },
      greyLabel: {
        textTransform: 'uppercase',
        color: Colors.bank.primary.grey,
        fontFamily: FontNames.Roboto_700Bold,
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'left',
        marginBottom: 16,
      },
      kpi: {
        fontFamily: FontNames.Roboto_700Bold,
        fontSize: 36,
        color: Colors.bank.primary.darkBlue,
        lineHeight: 48,
        marginLeft: 8,
      },
      subtitle: {
        fontFamily: FontNames.Roboto_700Bold,
        fontSize: 12,
        color: Colors.bank.primary.darkGrey,
      },
      legend: {
        fontFamily: FontNames.Roboto_400Regular,
        fontSize: 11,
        color: Colors.bank.primary.grey,
        lineHeight: 15,
        marginTop: 16,
        marginLeft: 8,
        textAlign: 'center',
      },
      darkBlue: {
        fontFamily: FontNames.MartelSans_400Regular,
        fontSize: 16,
        color: Colors.bank.primary.darkBlue,
        lineHeight: 22,
        textAlign: 'center',
      },
      boldDarkBlue: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.bank.primary.darkBlue,
        textAlign: 'left',
        fontFamily: FontNames.MartelSans_700Bold,
      },
      grey: {
        fontSize: 14,
        lineHeight: 19,
        color: Colors.bank.primary.grey,
        fontFamily: FontNames.Roboto_400Regular,
      },
      input: {
        color: Colors.bank.secondary.pink,
        fontFamily: FontNames.Roboto_400Regular,
        fontSize: 14,
        textAlign: 'center',
      },
      errors: {
        color: Colors.bank.secondary.salmon,
        fontFamily: FontNames.Roboto_700Bold,
        fontSize: 12,
        textAlign: 'center',
      },
      white: {
        color: Colors.bank.primary.white,
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: FontNames.MartelSans_700Bold,
      },
    },
  },
});
