import { FC, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, useTheme } from '@rneui/themed';

import { Colors, FontNames, NEEDS_SMALL_TEXT } from '../../../constants';

type IData = { key: string; value: string };

type IProps = {
  label?: string;
  options: [IData, IData];
  onToggle: (option: IData) => void;
};

const SwitchButtonBase: FC<IProps> = (props: IProps) => {
  const [toggle, setToggle] = useState(true);
  const { theme } = useTheme();

  const handleOnPress = (position: 0 | 1) => {
    setToggle(!toggle);
    props.onToggle(props.options[position]);
  };

  const renderLabel = () => {
    if (!props.label) return null;
    return (
      <View style={styles.labelContainer}>
        <Text style={[theme.text.label, { color: Colors.secondary.pink }]}>
          {props.label.toLocaleUpperCase()}
        </Text>
      </View>
    );
  };

  const renderButton = (position: 0 | 1) => (
    <Button
      buttonStyle={[
        styles.button,
        { backgroundColor: toggle === (position === 0) ? Colors.primary.white : Colors.transparent },
      ]}
      onPress={() => handleOnPress(position)}
    >
      <Text
        style={[
          styles.text,
          { color: toggle === (position === 0) ? Colors.primary.darkGrey : Colors.primary.lightGrey },
        ]}
      >
        {props.options[position].value}
      </Text>
    </Button>
  );

  return (
    <View>
      {renderLabel()}
      {Platform.OS === 'web' ? (
        <WebSwitchButtonContent renderButton={renderButton} />
      ) : (
        <MobileSwitchButtonContent renderButton={renderButton} theme={theme} />
      )}
    </View>
  );
};

const WebSwitchButtonContent: FC<{ renderButton: (position: 0 | 1) => JSX.Element }> = ({ renderButton }) => (
  <View style={[styles.container, styles.webShadow]}>
    <LinearGradient
      colors={[Colors.greenGradient.lightGreen, Colors.greenGradient.darkGreen]}
      start={[0, 1]}
      end={[1, 0]}
      style={[styles.gradient, styles.webShadow]}
    >
      {renderButton(0)}
      {renderButton(1)}
    </LinearGradient>
  </View>
);

const MobileSwitchButtonContent: FC<{
  renderButton: (position: 0 | 1) => JSX.Element;
  theme: any;
}> = ({ renderButton, theme }) => (
  <View style={[theme.container.button.long, theme.container.centeredItems, theme.shadow.button]}>
    <LinearGradient
      colors={[Colors.greenGradient.lightGreen, Colors.greenGradient.darkGreen]}
      start={[0, 1]}
      end={[1, 0]}
      style={[
        theme.container.button.long,
        theme.container.centeredItems,
        theme.shadow.button,
        { height: 55 },
      ]}
    >
      {renderButton(0)}
      {renderButton(1)}
    </LinearGradient>
  </View>
);

export const SwitchButton: FC<IProps> = SwitchButtonBase;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 28,
  },
  gradient: {
    flexDirection: 'row',
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 28,
  },
  labelContainer: {
    marginBottom: 16,
  },
  button: {
    position: 'relative',
    width: (Dimensions.get('window').width * 0.75 - 20) / 2,
    height: 46,
    borderRadius: 28,
  },
  text: {
    fontFamily: FontNames.MartelSans_600SemiBold,
    fontSize: NEEDS_SMALL_TEXT ? 12 : 14,
  },
  webShadow: {
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  },
});
