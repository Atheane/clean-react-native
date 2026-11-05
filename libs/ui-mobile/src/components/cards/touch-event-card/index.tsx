import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Dimensions,
  Platform,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

import { NEEDS_SMALL_TEXT } from '../../../constants';
import { Close } from '../../../assets';
import { LinkButtonColors } from '../../../types';
import { LinkButton } from '../../buttons/link-button';

type IProps = {
  image?: ImageSourcePropType;
  icon?: React.FC<SvgProps>;
  uid: string;
  title: string;
  vertical?: boolean;
  text?: string;
  onDelete?: (uid: string) => void;
  onPress?: (uid: string) => void;
};

const KPI_CARD_RATIO = 112 / 174;

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
        style={
          Platform.OS === 'web'
            ? [
                styles.webShadow,
                props.vertical && {
                  minHeight: Dimensions.get('window').width * 0.6,
                },
              ]
            : [
                theme.container.card.short,
                theme.shadow.card,
                props.vertical && {
                  height: Dimensions.get('window').width * 0.6,
                  width: Dimensions.get('window').width * 0.45,
                  marginHorizontal: 8,
                },
              ]
        }
      >
        <View style={props.vertical ? styles.subContainerVertical : styles.subContainer}>
          {props.image && <Image style={styles.image} source={props.image} />}
          {props.icon && <props.icon style={styles.icon} />}
          <Text
            style={[
              styles.text,
              props.vertical ? theme.text.boldDarkBlue : theme.text.grey,
              NEEDS_SMALL_TEXT
                ? { fontSize: 10, lineHeight: 12, paddingTop: 10 }
                : { fontSize: 12, lineHeight: 14, paddingTop: 8 },
              props.vertical && { fontSize: 14, padding: 6 },
            ]}
          >
            {props.title}
          </Text>
        </View>
        {props.text && props.vertical && (
          <View style={styles.textContainer}>
            <Text style={[styles.text, theme.text.grey]}>{props.text}</Text>
          </View>
        )}
      </TouchableOpacity>
      {props.onDelete && (
        <View style={styles.close}>
          <LinkButton
            onPress={handleOnDelete}
            iconRight={() => <Close />}
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
  subContainerVertical: {
    flexDirection: 'row',
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  icon: {
    position: 'relative',
    top: -16,
    left: -10,
    width: 24,
    height: 24,
    marginBottom: -30,
  },
  close: {
    position: 'absolute',
    top: 16,
    right: 20,
  },
  text: {
    top: 10,
    left: 6,
  },
  webShadow: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    minHeight: Dimensions.get('window').width * 0.9 * KPI_CARD_RATIO * 0.5,
    borderRadius: 28,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minWidth: 500,
  },
  textContainer: {
    paddingHorizontal: 12,
  },
});
