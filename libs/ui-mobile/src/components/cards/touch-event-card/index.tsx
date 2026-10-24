import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useTheme } from '@rneui/themed';
import { getDeviceId, getBrand } from 'react-native-device-info';

import { DeleteCross } from '../../../assets';
import { LinkButtonColors } from '../../../types';
import { LinkButton } from '../../buttons/link-button';

type IProps = {
  image: ImageSourcePropType;
  uid: string;
  text: string;
  onDelete?: (uid: string) => void;
  onPress?: (uid: string) => void;
};

const brand = getBrand();
const model = getDeviceId();

const NEEDS_SMALL_TEXT = brand === 'OPPO' && model === 'lahaina';

export const TouchEventCard = (props: IProps) => {
  const { theme } = useTheme();

  const [show, setShow] = useState(true);
  const handleOnDelete = useCallback(() => {
    if (props.onDelete) props.onDelete(props.uid);
    setShow(false);
  }, [props]);

  const handleOnPress = useCallback(() => {
    if (props.onPress) props.onPress(props.uid);
    return;
  }, [props]);

  return show ? (
    <View>
      <TouchableOpacity
        onPress={handleOnPress}
        activeOpacity={0.85}
        style={[theme.bank.container.card.short, theme.bank.shadow.card]}
      >
        <View style={styles.subContainer}>
          <Image style={styles.image} source={props.image} />
          <Text
            style={[
              styles.text,
              theme.bank.text.grey,
              NEEDS_SMALL_TEXT
                ? { fontSize: 10, lineHeight: 12, paddingTop: 10 }
                : { fontSize: 12, lineHeight: 14, paddingTop: 8 },
            ]}
          >
            {props.text}
          </Text>
        </View>
      </TouchableOpacity>
      {props.onDelete && (
        <View style={styles.deleteCross}>
          <LinkButton onPress={handleOnDelete} iconRight={DeleteCross} colorOption={LinkButtonColors.BLUE} />
        </View>
      )}
    </View>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  subContainer: {
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  image: {
    position: 'relative',
    top: -16,
    left: -10,
    width: 80,
    height: 80,
    marginBottom: -30,
  },
  deleteCross: {
    position: 'absolute',
    top: 16,
    right: 20,
  },
  text: {
    top: 10,
    left: 6,
  },
});
