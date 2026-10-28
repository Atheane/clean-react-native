import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Button, useTheme } from '@rneui/themed';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { Colors } from '../../../constants';

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
  const renderLabel = (text: string) => (text.length < 18 ? `${text}` : `${text}`.slice(0, 15) + '...');

  return (
    <View
      style={[props.long ? theme.container.button.long : theme.container.button.short, theme.shadow.button]}
    >
      <Button
        buttonStyle={[
          theme.shadow.button,
          styles.button,
          props.iconOne && styles.buttonOneIcon,
          theme.container.centeredItems,
        ]}
        containerStyle={[
          props.long ? theme.container.button.long : theme.container.button.short,
          theme.shadow.button,
        ]}
        loading={props?.loading ?? false}
        linearGradientProps={{
          colors: [Colors.greenGradient.lightGreen, Colors.greenGradient.darkGreen],
          start: [0, 1],
          end: [1, 0],
        }}
        onPress={props.onPress}
        disabled={props.disabled}
        raised
      >
        <View style={theme.container.centeredItems}>
          {props.iconOne && (
            <View style={styles.iconOneContainer}>
              <props.iconOne />
            </View>
          )}

          <Text
            style={[theme.text.button, styles.content, props.uppercase && { textTransform: 'uppercase' }]}
          >
            {renderLabel(firstLetterCapitalize(props.title))}
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
    backgroundColor: Colors.primary.white,
  },
  content: {
    color: Colors.primary.lightGreen,
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
