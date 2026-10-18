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
        bulletGreen: StyleProp<ViewStyle>;
        button: {
          short: StyleProp<ViewStyle>;
          long: StyleProp<ViewStyle>;
        };
        centeredItem: StyleProp<ViewStyle>;
        centeredItems: StyleProp<ViewStyle>;
        card: {
          short: StyleProp<ViewStyle>;
          long: StyleProp<ViewStyle>;
          kpi: StyleProp<ViewStyle>;
        };
        input: StyleProp<ViewStyle>;
      };
      shadow: {
        button: StyleProp<ViewStyle>;
        bullet: StyleProp<ViewStyle>;
        card: StyleProp<ViewStyle>;
      };
      text: {
        banner: StyleProp<TextStyle>;
        link: StyleProp<TextStyle>;
        button: StyleProp<TextStyle>;
        label: StyleProp<TextStyle>;
        kpi: StyleProp<TextStyle>;
        subtitle: StyleProp<TextStyle>;
        legend: StyleProp<TextStyle>;
        darkBlue: StyleProp<TextStyle>;
        boldDarkBlue: StyleProp<TextStyle>;
        grey: StyleProp<TextStyle>;
        cyan: StyleProp<TextStyle>;
        input: StyleProp<TextStyle>;
        errors: StyleProp<TextStyle>;
        white: StyleProp<TextStyle>;
      };
    };
  }
}

const SHORT_CARD_RATIO = 168 / 228;
const LONG_CARD_RATIO = 85 / 356;
const KPI_CARD_RATIO = 112 / 174;

export const theme = createTheme({
  bank: {
    container: {
      bulletGreen: {
        backgroundColor: Colors.bank.primary.lightGreen,
        width: 13,
        height: 13,
        borderRadius: 50,
        margin: 3.5,
      },
      button: {
        short: {
          flexDirection: 'row',
          borderRadius: 28,
        },
        long: {
          width: Dimensions.get('window').width * 0.8,
          borderRadius: 28,
        },
      },
      centeredItem: { alignItems: 'center', justifyContent: 'center' },
      centeredItems: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
      card: {
        short: {
          width: Dimensions.get('window').width * 0.5,
          height: Dimensions.get('window').width * 0.5 * SHORT_CARD_RATIO,
          margin: 16,
          borderRadius: 16,
          borderWidth: 0,
        },
        long: {
          width: Dimensions.get('window').width * 0.9,
          minHeight: Dimensions.get('window').width * 0.9 * LONG_CARD_RATIO,
          borderRadius: 20,
          borderWidth: 0,
        },
        kpi: {
          width: Dimensions.get('window').width * 0.46,
          height: Dimensions.get('window').width * 0.46 * KPI_CARD_RATIO,
          margin: 16,
          borderRadius: 20,
          backgroundColor: Colors.bank.primary.white,
          padding: 8,
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
      button: {
        shadowColor: Colors.bank.shadow, // iOS
        shadowOffset: { width: 0, height: 15 }, // iOS
        shadowOpacity: 0.6, // iOS
        shadowRadius: 20, // iOS
        elevation: 50, // android,
        borderRadius: 28,
      },
      bullet: {
        backgroundColor: Colors.bank.primary.white,
        width: 20,
        height: 20,
        borderRadius: 50,
        marginHorizontal: 4,
        shadowColor: Colors.bank.shadow,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
      },
      card: {
        shadowColor: Colors.bank.shadow,
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
      },
    },
    text: {
      banner: {
        color: Colors.bank.primary.white,
        fontSize: 18,
        fontFamily: FontNames.MartelSans_700Bold,
        fontWeight: '700',
      },
      link: {
        textAlign: 'left',
        fontFamily: FontNames.Roboto_400Regular,
        fontSize: 14,
        lineHeight: 19,
      },
      button: {
        lineHeight: 24,
        fontSize: 18,
        fontFamily: FontNames.Roboto_700Bold,
        textTransform: 'none',
      },
      label: {
        textTransform: 'uppercase',
        fontFamily: FontNames.Roboto_700Bold,
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'left',
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
      cyan: {
        fontSize: 16,
        fontFamily: FontNames.Roboto_400Regular,
        color: Colors.bank.secondary.cyan,
        lineHeight: 21,
      },
      input: {
        color: Colors.bank.secondary.pink,
        fontFamily: FontNames.Roboto_400Regular,
        fontSize: 14,
        textAlign: 'left',
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
