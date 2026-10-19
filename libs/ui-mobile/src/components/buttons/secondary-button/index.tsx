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
        buttonStyle={styles.button}
        containerStyle={props.long ? theme.bank.container.button.long : theme.bank.container.button.short}
        loading={props?.loading ?? false}
        onPress={props.onPress}
        disabled={props.disabled}
        raised
      >
        <View style={theme.bank.container.centeredItems}>
          {props.iconOne && (
            <View style={styles.iconContainer}>
              <props.iconOne />
            </View>
          )}
          <View>
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
        </View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingTop: 12,
    paddingRight: 24,
    paddingBottom: 11,
    paddingLeft: 26,
    backgroundColor: Colors.bank.primary.white,
    borderRadius: 28,
  },
  content: {
    color: Colors.bank.primary.lightGreen,
  },
  iconContainer: {
    marginRight: 15,
  },
});
