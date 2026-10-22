import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, useTheme } from '@rneui/themed';

import { Colors } from '../../../constants';
import { firstLetterCapitalize } from '../../../utils';

type IProps = {
  title: string;
  long?: boolean;
  uppercase?: boolean;
  iconOne?: React.FC<SvgProps>;
  iconTwo?: React.FC<SvgProps>;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export const PrimaryButton: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();
  const renderLabel = (text: string) => (text.length < 20 ? `${text}` : `${text}`.slice(0, 20) + '...');

  return (
    <View
      style={[
        props.long ? theme.bank.container.button.long : theme.bank.container.button.short,
        theme.bank.shadow.button,
      ]}
    >
      <Button
        ViewComponent={LinearGradient}
        buttonStyle={[
          theme.bank.shadow.button,
          styles.button,
          (props.iconOne || props.iconTwo) && !props.loading && styles.buttonIcon,
          props.iconOne && !props.iconTwo && !props.loading && styles.buttonOneIcon,
          theme.bank.container.centeredItems,
        ]}
        containerStyle={[
          props.long ? theme.bank.container.button.long : theme.bank.container.button.short,
          theme.bank.shadow.button,
        ]}
        loading={props?.loading ?? false}
        linearGradientProps={{
          colors: [Colors.bank.greenGradient.lightGreen, Colors.bank.greenGradient.darkGreen],
          start: [0, 1],
          end: [1, 0],
        }}
        onPress={props.onPress}
        disabled={props.disabled}
        raised
      >
        <View style={theme.bank.container.centeredItems}>
          {props.iconOne && (
            <View style={styles.iconOneContainer}>
              <props.iconOne />
            </View>
          )}

          <Text
            style={[
              theme.bank.text.button,
              styles.content,
              props.uppercase && { textTransform: 'uppercase' },
            ]}
          >
            {renderLabel(firstLetterCapitalize(props.title))}
          </Text>
          {props.iconTwo && (
            <View style={styles.iconTwoContainer}>
              <props.iconTwo />
            </View>
          )}
        </View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOneIcon: {
    paddingRight: 50,
  },
  buttonIcon: {
    paddingTop: 11,
    paddingBottom: 11,
  },
  button: {
    height: 55,
    paddingTop: 15,
    paddingRight: 24,
    paddingBottom: 16,
    paddingLeft: 26,
  },
  content: {
    color: Colors.bank.primary.white,
  },
  iconOneContainer: {
    height: 32,
    alignItems: 'center',
    paddingHorizontal: 6,
    justifyContent: 'center',
    marginRight: 15,
  },
  iconOne: {
    width: 32,
    height: 32,
  },
  iconTwoContainer: {
    marginLeft: 15,
  },
});
