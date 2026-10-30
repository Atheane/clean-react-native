import '@rneui/themed';
import { Dimensions, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { createTheme } from '@rneui/themed';

import { FontNames, Colors, NEEDS_SMALL_TEXT } from '@clean-rn/ui-mobile';

declare module '@rneui/themed' {
  export interface Theme {
    buttons: {
      primary: {
        base: StyleProp<ViewStyle>;
        short: StyleProp<ViewStyle>;
        long: StyleProp<ViewStyle>;
        mini: StyleProp<ViewStyle>;
        content: StyleProp<TextStyle>;
        miniContent: StyleProp<TextStyle>;
        iconLeftContainer: StyleProp<ViewStyle>;
        iconRightContainer: StyleProp<ViewStyle>;
        gradientColors?: string[];
        additionalProps: object;
      };
    };
    container: {
      bulletColor: StyleProp<ViewStyle>;
      button: {
        short: StyleProp<ViewStyle>;
        long: StyleProp<ViewStyle>;
      };
      centeredItem: StyleProp<ViewStyle>;
      centeredItems: StyleProp<ViewStyle>;
      justifiedItems: StyleProp<ViewStyle>;
      leftItems: StyleProp<ViewStyle>;
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
      title: StyleProp<TextStyle>;
      content: StyleProp<TextStyle>;
      banner: StyleProp<TextStyle>;
      link: StyleProp<TextStyle>;
      label: StyleProp<TextStyle>;
      kpi: StyleProp<TextStyle>;
      subtitle: StyleProp<TextStyle>;
      legend: StyleProp<TextStyle>;
      darkBlue: StyleProp<TextStyle>;
      boldDarkBlue: StyleProp<TextStyle>;
      lightBlue: StyleProp<TextStyle>;
      lightGrey: StyleProp<TextStyle>;
      grey: StyleProp<TextStyle>;
      boldGrey: StyleProp<TextStyle>;
      cyan: StyleProp<TextStyle>;
      input: StyleProp<TextStyle>;
      inputPicker: StyleProp<TextStyle>;
      inputNumber: StyleProp<TextStyle>;
      errors: StyleProp<TextStyle>;
      numberTitle: StyleProp<TextStyle>;
      whiteGraphTitle: StyleProp<TextStyle>;
      purple: StyleProp<TextStyle>;
    };
  }
}

const COEFF = 0.75;

const SHORT_CARD_RATIO = 168 / 228;
const LONG_CARD_RATIO = 85 / 356;
const KPI_CARD_RATIO = 112 / 174;

export const theme = createTheme({
  buttons: {
    primary: {
      base: {
        height: 55,
        paddingTop: 15,
        paddingRight: 24,
        paddingBottom: 16,
        paddingLeft: 26,
        borderRadius: 28,
      },
      mini: {
        height: 32,
        width: 140,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
      },
      content: {
        color: Colors.primary.white,
        lineHeight: 20,
        fontSize: NEEDS_SMALL_TEXT ? 14 : 18,
        fontFamily: FontNames.Roboto_700Bold,
        textTransform: 'none',
      },
      miniContent: {
        fontSize: 14,
      },
      iconLeftContainer: {
        height: 32,
        alignItems: 'center',
        paddingHorizontal: 6,
        justifyContent: 'center',
        marginRight: 15,
      },
      iconRightContainer: {
        marginLeft: 15,
      },
      gradientColors: [Colors.primary.lightGreen, Colors.primary.darkGreen],
    },
  },
  container: {
    button: {
      short: {
        flexDirection: 'row',
        borderRadius: 28,
      },
      long: {
        width: Dimensions.get('window').width * COEFF,
        borderRadius: 32,
        backgroundColor: Colors.primary.lightGreen,
      },
    },
    bulletColor: {
      backgroundColor: Colors.primary.lightGreen,
      width: 13,
      height: 13,
      borderRadius: 50,
      margin: 3.5,
    },
    centeredItem: { alignItems: 'center', justifyContent: 'center' },
    centeredItems: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
    justifiedItems: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    leftItems: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    card: {
      short: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5 * SHORT_CARD_RATIO,
        margin: 16,
        borderRadius: 16,
        borderWidth: 0,
        backgroundColor: Colors.primary.white,
      },
      long: {
        width: Dimensions.get('window').width * 0.9,
        minHeight: Dimensions.get('window').width * 0.9 * LONG_CARD_RATIO,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 20,
        backgroundColor: Colors.primary.white,
      },
      kpi: {
        width: Dimensions.get('window').width * 0.46,
        height: Dimensions.get('window').width * 0.46 * KPI_CARD_RATIO,
        marginHorizontal: 16,
        borderRadius: 20,
        backgroundColor: Colors.primary.white,
        padding: 8,
      },
    },
    input: {
      width: Dimensions.get('window').width * COEFF,
      backgroundColor: Colors.primary.lightGrey,
      borderRadius: 8,
      marginTop: 11,
      marginBottom: -16, // override of default input bottomMargin
      borderBottomWidth: 0,
    },
  },
  shadow: {
    button: {
      shadowColor: Colors.shadow, // iOS
      shadowOffset: { width: 0, height: 15 }, // iOS
      shadowOpacity: 0.6, // iOS
      shadowRadius: 28, // iOS
      elevation: 50, // android,
      borderRadius: 28,
    },
    bullet: {
      backgroundColor: Colors.primary.white,
      width: 20,
      height: 20,
      borderRadius: 50,
      marginHorizontal: 4,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
    card: {
      shadowColor: Colors.shadow,
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
    title: {
      fontFamily: FontNames.Roboto_700Bold,
      fontSize: NEEDS_SMALL_TEXT ? 22 : 32,
      color: Colors.primary.darkBlue,
      lineHeight: 32,
    },
    content: {
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: NEEDS_SMALL_TEXT ? 14 : 18,
      color: Colors.primary.grey,
      lineHeight: 20,
    },
    banner: {
      color: Colors.primary.white,
      fontSize: NEEDS_SMALL_TEXT ? 15 : 18,
      fontFamily: FontNames.MartelSans_700Bold,
      fontWeight: '700',
    },
    link: {
      textAlign: 'left',
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: NEEDS_SMALL_TEXT ? 13 : 16,
      lineHeight: 20,
      paddingLeft: 8,
    },
    label: {
      textTransform: 'uppercase',
      fontFamily: FontNames.Roboto_700Bold,
      fontSize: NEEDS_SMALL_TEXT ? 13 : 16,
      lineHeight: 21,
      textAlign: 'left',
    },
    kpi: {
      fontFamily: FontNames.Roboto_700Bold,
      fontSize: NEEDS_SMALL_TEXT ? 18 : 32,
      color: Colors.primary.darkBlue,
      lineHeight: 48,
      marginLeft: 8,
    },
    subtitle: {
      fontFamily: FontNames.Roboto_700Bold,
      fontSize: NEEDS_SMALL_TEXT ? 10 : 14,
      color: Colors.primary.darkGrey,
    },
    legend: {
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: NEEDS_SMALL_TEXT ? 8 : 12,
      color: Colors.primary.grey,
      lineHeight: 15,
      marginTop: 16,
      marginLeft: 8,
      textAlign: 'center',
    },
    purple: {
      fontFamily: FontNames.Roboto_400Regular,
      color: Colors.secondary.purple,
      lineHeight: 19,
    },
    darkBlue: {
      fontFamily: FontNames.MartelSans_400Regular,
      fontSize: NEEDS_SMALL_TEXT ? 13 : 16,
      color: Colors.primary.darkBlue,
      lineHeight: 24,
    },
    boldDarkBlue: {
      fontSize: NEEDS_SMALL_TEXT ? 13 : 14,
      fontWeight: 'bold',
      color: Colors.primary.darkBlue,
      textAlign: 'left',
      fontFamily: FontNames.MartelSans_700Bold,
    },
    lightBlue: {
      fontSize: NEEDS_SMALL_TEXT ? 13 : 14,
      color: Colors.primary.darkBlue,
      textAlign: 'left',
      fontFamily: FontNames.MartelSans_400Regular,
      opacity: 0.6,
    },
    lightGrey: {
      fontSize: NEEDS_SMALL_TEXT ? 13 : 16,
      fontFamily: FontNames.MartelSans_400Regular,
      textAlign: 'center',
      color: Colors.primary.grey,
    },
    grey: {
      fontSize: NEEDS_SMALL_TEXT ? 13 : 14,
      fontFamily: FontNames.MartelSans_400Regular,
      textAlign: 'left',
      color: Colors.primary.darkGrey,
    },
    boldGrey: {
      fontSize: NEEDS_SMALL_TEXT ? 13 : 14,
      fontFamily: FontNames.MartelSans_700Bold,
      color: Colors.primary.darkGrey,
      fontWeight: 'bold',
    },
    cyan: {
      fontSize: NEEDS_SMALL_TEXT ? 13 : 16,
      fontFamily: FontNames.Roboto_400Regular,
      color: Colors.secondary.cyan,
      lineHeight: 21,
    },
    input: {
      color: Colors.secondary.pink,
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: NEEDS_SMALL_TEXT ? 12 : 14,
      textAlign: 'left',
    },
    inputPicker: {
      color: Colors.secondary.pink,
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: NEEDS_SMALL_TEXT ? 14 : 16,
      textAlign: 'left',
    },
    inputNumber: {
      color: Colors.secondary.pink,
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: NEEDS_SMALL_TEXT ? 28 : 32,
      textAlign: 'center',
      justifyContent: 'center',
    },
    errors: {
      color: Colors.secondary.salmon,
      fontFamily: FontNames.MartelSans_400Regular,
      fontSize: NEEDS_SMALL_TEXT ? 12 : 14,
      textAlign: 'center',
    },
    numberTitle: {
      color: Colors.primary.white,
      fontSize: NEEDS_SMALL_TEXT ? 14 : 16,
      fontWeight: 'bold',
      fontFamily: FontNames.MartelSans_700Bold,
    },
    whiteGraphTitle: {
      fontFamily: FontNames.Roboto_700Bold,
      fontSize: NEEDS_SMALL_TEXT ? 36 : 42,
      color: Colors.primary.white,
    },
  },
});
