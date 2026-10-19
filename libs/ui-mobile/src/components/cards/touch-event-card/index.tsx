import { useCallback } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Card, useTheme } from '@rneui/themed';

type IProps = {
  image: ImageSourcePropType;
  uid: string;
  text: string;
  onPress: (uid: string) => void;
};

export const TouchEventCard = (props: IProps) => {
  const handleOnPress = useCallback(
    (uid: string) => {
      props.onPress(uid);
    },
    [props],
  );

  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={() => handleOnPress(props.uid)} activeOpacity={0.85}>
      <Card containerStyle={[theme.bank.container.card.short, theme.bank.shadow.card]}>
        <Image style={styles.image} source={props.image} />
        <Text style={[styles.text, theme.bank.text.grey]}>{props.text}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'relative',
    top: -16,
    left: -10,
    width: 80,
    height: 80,
  },
  deleteCross: {
    position: 'absolute',
    top: -20,
    right: -10,
  },
  text: {
    top: -16,
    left: 6,
    lineHeight: 18,
  },
});
