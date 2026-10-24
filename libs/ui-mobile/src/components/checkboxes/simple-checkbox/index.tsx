import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox, useTheme } from '@rneui/themed';
import { getDeviceId, getBrand } from 'react-native-device-info';

import { Colors } from '../../../constants';

type IProps = {
  title: string;
  checked: boolean;
  toggleCheckbox: (checked: boolean) => void;
};

const brand = getBrand();
const model = getDeviceId();

const NEEDS_SMALL_TEXT = brand === 'OPPO' && model === 'lahaina';

export const SimpleCheckBox: React.FunctionComponent<IProps> = (props: IProps) => {
  const [checked, setChecked] = useState<boolean>(props.checked);

  const toggleCheckbox = useCallback(
    (checked: boolean) => {
      setChecked(!checked);
      props.toggleCheckbox(!checked);
    },
    [props],
  );

  // css theme
  const { theme } = useTheme();
  return (
    <CheckBox
      containerStyle={styles.container}
      textStyle={[theme.bank.text.darkBlue, styles.title]}
      checkedColor={Colors.bank.primary.lightGreen}
      title={props.title}
      checked={checked}
      onPress={() => toggleCheckbox(checked)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '75%',
  },
  title: {
    textAlign: 'left',
    fontSize: NEEDS_SMALL_TEXT ? 10 : 12,
    lineHeight: NEEDS_SMALL_TEXT ? 14 : 16,
  },
});
