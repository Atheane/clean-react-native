import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Card } from '@rneui/themed';

import { DeleteCross } from '../../../assets';
import { Colors, FontNames } from '../../../constants';
import { LinkButtonColors } from '../../../types';

import { LinkButton } from '../../buttons/link-button';

type IProps = {
  icon: React.FC<SvgProps>;
  uid: string;
  text: string;
  onDelete: (uid: string) => void;
};

export const CARD_WIDTH = Dimensions.get('window').width * 0.5;
export const CARD_RATIO = 168 / 228;
export const EventCard = (props: IProps) => {
  const [show, setShow] = useState(true);
  const handleOnPress = useCallback(() => {
    props.onDelete(props.uid);
    setShow(false);
  }, []);

  return show ? (
    <Card containerStyle={styles.container}>
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
      <Text style={styles.text}>{props.text}</Text>
    </Card>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * CARD_RATIO,
    margin: 16,
    borderRadius: 16,
    borderWidth: 0,
    shadowColor: Colors.shadow.bold,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  icon: {
    position: 'relative',
    top: -16,
    left: -10,
    width: 80,
  },
  deleteCross: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  text: {
    top: -10,
    left: 6,
    fontSize: 16,
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.bank.primary.darkGrey,
    lineHeight: 22,
  },
});
