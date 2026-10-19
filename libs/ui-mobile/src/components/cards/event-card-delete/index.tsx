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
  onPress: (uid: string) => void;
};

export const EventCardDelete = (props: IProps) => {
  const { theme } = useTheme();

  const [show, setShow] = useState(true);
  const handleOnDelete = useCallback(() => {
    props.onDelete(props.uid);
    setShow(false);
  }, [props]);

  const handleOnPress = useCallback(() => {
    props.onPress(props.uid);
  }, [props]);

  return show ? (
    <Card containerStyle={[theme.bank.container.card.short, theme.bank.shadow.card]}>
      <View style={styles.subContainer}>
        <View style={styles.icon}>
          <LinkButton
            pressed={false}
            onPress={handleOnPress}
            iconOne={props.icon}
            colorOption={LinkButtonColors.BLUE}
          />
        </View>
        <View style={styles.deleteCross}>
          <LinkButton
            pressed={false}
            onPress={handleOnDelete}
            iconOne={DeleteCross}
            colorOption={LinkButtonColors.BLUE}
          />
        </View>
        <View style={[styles.textContainer]}>
          <Text style={[styles.text, theme.bank.text.grey]}>{props.text}</Text>
        </View>
      </View>
    </Card>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  subContainer: {
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  icon: {
    position: 'absolute',
    top: -36,
    left: -12,
    width: 80,
  },
  deleteCross: {
    position: 'absolute',
    top: -20,
    right: -10,
  },
  textContainer: {
    marginTop: 50,
    marginLeft: -8,
    alignItems: 'flex-start',
  },
  text: {
    lineHeight: 18,
  },
});
