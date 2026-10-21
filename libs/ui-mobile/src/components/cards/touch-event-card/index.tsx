import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useTheme } from '@rneui/themed';

import { DeleteCross } from '../../../assets';
import { LinkButtonColors } from '../../../types';
import { LinkButton } from '../../buttons/link-button';

type IProps = {
  image: ImageSourcePropType;
  uid: string;
  text: string;
  onDelete?: (uid: string) => void;
  onPress: (uid: string) => void;
};

export const TouchEventCard = (props: IProps) => {
  const { theme } = useTheme();

  const [show, setShow] = useState(true);
  const handleOnDelete = useCallback(() => {
    if (props.onDelete) props.onDelete(props.uid);
    setShow(false);
  }, [props]);

  const handleOnPress = useCallback(() => {
    props.onPress(props.uid);
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
          <Text style={[styles.text, theme.bank.text.grey]}>{props.text}</Text>
        </View>
      </TouchableOpacity>
      {props.onDelete && (
        <View style={styles.deleteCross}>
          <LinkButton
            pressed={false}
            onPress={handleOnDelete}
            iconOne={DeleteCross}
            colorOption={LinkButtonColors.BLUE}
          />
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
  },
  deleteCross: {
    position: 'absolute',
    top: 8,
    right: 20,
  },
  text: {
    top: -16,
    left: 6,
    lineHeight: 18,
  },
});
