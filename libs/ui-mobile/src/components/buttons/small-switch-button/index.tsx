import { View, StyleSheet } from 'react-native';
import { Switch } from '@rneui/themed';

import { Colors } from '../../../constants';

type IProps = {
  checked: boolean;
  onToggle: (checked: boolean) => void;
};

export const SmallSwitchButton = (props: IProps) => {
  const toggleSwitch = (value: boolean) => {
    props.onToggle(value);
  };

  return (
    <View style={styles.view}>
      <Switch value={props.checked} onValueChange={toggleSwitch} color={Colors.primary.lightGreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});
