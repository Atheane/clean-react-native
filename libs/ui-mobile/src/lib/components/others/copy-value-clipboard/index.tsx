import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';
import * as Clipboard from 'expo-clipboard';
import { Tooltip } from '@rneui/base';
import { useTheme } from '@rneui/themed';

import { Copy } from '../../../assets';
import { Colors } from '../../../constants';

type IProps = {
  value: string;
  icon: React.FC<SvgProps>;
};

export const CopyValueClipboard = (props: IProps) => {
  const [openTooltip, setOpenTooltip] = useState(false);

  const handleCopyValue = async () => {
    Clipboard.setStringAsync(props.value);
    displayTooltip();
  };

  const displayTooltip = () => {
    setOpenTooltip(true);
    setTimeout(() => {
      setOpenTooltip(false);
    }, 800);
  };

  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={theme.bank.container.leftItems}>
        <props.icon />
        <View style={styles.iconRight}>
          <Tooltip
            visible={openTooltip}
            withPointer={false}
            popover={<Text style={styles.tooltipText}>{props.value}</Text>}
            backgroundColor={Colors.bank.transparent}
            highlightColor={Colors.bank.primary.lightGreen}
            containerStyle={styles.tooltipContainer}
          />
          <TouchableOpacity onPress={handleCopyValue}>
            <Copy />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={theme.bank.text.boldGrey}>{props.value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 40,
  },
  iconRight: {
    marginLeft: 20,
  },
  textContainer: {
    width: '100%',
  },
  tooltipContainer: {
    marginLeft: -100,
    width: 200,
  },
  tooltipText: {
    color: Colors.bank.primary.lightGreen,
    textAlign: 'left',
  },
});
