import { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Card, useTheme } from '@rneui/themed';

import { DeleteCross } from '../../../assets';
import { LinkButtonColors } from '../../../types';

import { LinkButton } from '../../buttons/link-button';

type IProps = {
  icon: React.FC<SvgProps>;
  uid: string;
  text: string;
  onDelete: (uid: string) => void;
};

export const EventCard = (props: IProps) => {
  const [show, setShow] = useState(true);
  const handleOnPress = useCallback(() => {
    props.onDelete(props.uid);
    setShow(false);
  }, [props]);

  const { theme } = useTheme();

  return show ? (
    <Card containerStyle={[theme.bank.container.card.short, theme.bank.shadow.card]}>
      {props.icon && (
        <View style={styles.icon}>
          <props.icon />
        </View>
      )}
      <View style={styles.deleteCross}>
        <LinkButton
          pressed={false}
          onPress={handleOnPress}
          iconOne={DeleteCross}
          colorOption={LinkButtonColors.BLUE}
        />
      </View>
      <Text style={[styles.text, theme.bank.text.grey]}>{props.text}</Text>
    </Card>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'relative',
    top: -16,
    left: -10,
    width: 80,
  },
  deleteCross: {
    position: 'absolute',
    top: -20,
    right: -10,
  },
  text: {
    top: -20,
    left: 6,
  },
});
