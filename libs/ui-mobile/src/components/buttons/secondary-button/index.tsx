import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Button, useTheme } from '@rneui/themed';

import { Colors } from '../../../constants';
import { firstLetterCapitalize } from '../../../utils';

type IProps = {
  title: string;
  long?: boolean;
  uppercase?: boolean;
  iconOne?: React.FC<SvgProps>;
  loading?: boolean;
  onPress: () => void;
  disabled?: boolean;
};

export const SecondaryButton: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        props.long ? theme.bank.container.button.long : theme.bank.container.button.short,
        theme.bank.shadow.button,
      ]}
    >
      <Button
        buttonStyle={[
          theme.bank.shadow.button,
          styles.button,
          props.iconOne && styles.buttonOneIcon,
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
            {firstLetterCapitalize(props.title)}
          </Text>
        </View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOneIcon: {
    paddingRight: 50,
    paddingTop: 11,
    paddingBottom: 11,
  },
  button: {
    height: 55,
    paddingTop: 15,
    paddingRight: 24,
    paddingBottom: 16,
    paddingLeft: 26,
    backgroundColor: Colors.bank.primary.white,
  },
  content: {
    color: Colors.bank.primary.lightGreen,
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
});
