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
  text?: string;
  textColor?: string;
  icon: React.FC<SvgProps>;
  copyText?: string;
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
      <View style={theme.container.leftItems}>
        <View style={styles.iconContainer}>
          <props.icon />
          {props.text && (
            <Text style={props.textColor ? { color: props.textColor } : theme.text.grey}>{props.text}</Text>
          )}
        </View>
        <View style={styles.iconRight}>
          <Tooltip
            visible={openTooltip}
            withPointer={false}
            popover={
              <View style={styles.tooltipContainer}>
                <Text style={[styles.tooltipText, props.textColor && { color: props.textColor }]}>
                  {props.value}
                </Text>
              </View>
            }
            backgroundColor={Colors.transparent}
            highlightColor={props.textColor ?? Colors.primary.lightGreen}
            containerStyle={styles.tooltipContainer}
          />
          <TouchableOpacity onPress={handleCopyValue}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Copy color={props.textColor ?? Colors.primary.lightGreen} style={{ marginRight: -50 }} />
              <Text
                style={{
                  color: props.textColor ?? Colors.primary.lightGreen,
                  textAlign: 'left',
                  paddingLeft: 0,
                }}
              >
                {props.copyText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={theme.text.boldGrey}>{props.value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 40,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRight: {
    marginLeft: 20,
  },
  textContainer: {
    width: '100%',
  },
  tooltipContainer: {
    backgroundColor: Colors.primary.white,
    width: '100%',
  },
  tooltipText: {
    color: Colors.primary.lightGreen,
    textAlign: 'left',
  },
});
