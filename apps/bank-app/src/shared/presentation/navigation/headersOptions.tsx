import { Colors, FontNames, GreenBackButton } from '@clean-rn/ui-mobile';
import { HeaderTitleAlign } from '../types';

const headersOptions = (onPressBackButton?: () => void) =>
  onPressBackButton
    ? {
        headerLeft(): JSX.Element {
          return <GreenBackButton onPress={onPressBackButton} />;
        },
        headerTitleAlign: 'center' as HeaderTitleAlign,
        headerTitleStyle: {
          color: Colors.bank.primary.darkBlue,
          fontSize: 19,
          fontFamily: FontNames.MartelSans_600SemiBold,
        },
      }
    : {
        headerTitleAlign: 'center' as HeaderTitleAlign,
        headerTitleStyle: {
          color: Colors.bank.primary.darkBlue,
          fontSize: 19,
          fontFamily: FontNames.MartelSans_600SemiBold,
        },
      };

export { headersOptions };
