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

  return (
    <View style={props.long ? theme.bank.container.button.long : theme.bank.container.button.short}>
      <Button
        ViewComponent={LinearGradient}
        style={[theme.bank.shadow, styles.buttonContainer]}
        buttonStyle={styles.button}
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
              { textTransform: props.uppercase ? 'uppercase' : 'none' },
            ]}
          >
            {firstLetterCapitalize(props.title)}
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
  buttonContainer: {
    borderRadius: 50,
  },
  button: {
    paddingTop: 15,
    paddingRight: 24,
    paddingBottom: 16,
    paddingLeft: 26,
  },
  content: {
    color: Colors.bank.primary.white,
  },
  iconOneContainer: {
    marginRight: 15,
  },
  iconTwoContainer: {
    marginLeft: 15,
  },
});
