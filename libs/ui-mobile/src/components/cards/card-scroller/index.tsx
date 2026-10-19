/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { ScrollView, Dimensions, StyleSheet, View, ImageSourcePropType } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

import { EventCardDelete } from '../event-card-delete';
import { TouchEventCard } from '../touch-event-card';

export enum ICardType {
  EVENT_CARD_DELETE = 'event-card-delete',
  TOUCH_EVENT_CARD = 'touch-event-card',
}

type IPropsEventCardDelete = {
  uid: string;
  icon: React.FC<SvgProps>;
  text: string;
};

type IPropsTouchEventCard = {
  uid: string;
  image: ImageSourcePropType;
  text: string;
};

type IPropsEventCard<T extends ICardType.EVENT_CARD_DELETE | ICardType.TOUCH_EVENT_CARD> =
  T extends ICardType.EVENT_CARD_DELETE ? IPropsEventCardDelete : IPropsTouchEventCard;

type IProps = {
  data: IPropsEventCard<ICardType>[];
  height?: number;
  cardType: ICardType;
  onPress?: (uid: string) => void;
};

type IState = {
  onDelete?: (uid: string) => void;
};

export const CardScroller = (props: IProps & IState) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const [data, setData] = useState<IPropsEventCard<ICardType>[]>(props.data);

  const handleOnScroll = useCallback(
    (event: any) => {
      const scrollOffset = event.nativeEvent.contentOffset.x;
      const cardWidth = Dimensions.get('window').width * 0.5 + 20;
      let index = Math.round(scrollOffset / (cardWidth - 20));
      if (index < 0) index = 0;
      if (index > data.length - 1) index = data.length - 1;
      setSlideIndex(index);
    },
    [data.length],
  );

  const handleOnDelete = (uid: string) => {
    const removeIndex = data.map((item) => item.uid).indexOf(uid);
    data.splice(removeIndex, 1);
    setData([...data] as IPropsEventCard<ICardType>[]);
    if (props.onDelete) props.onDelete(uid);
  };

  const { theme } = useTheme();

  const bullets = data.map((_, index) =>
    index === slideIndex ? (
      <View key={index} style={theme.bank.shadow.bullet}>
        <View key={index} style={theme.bank.container.bulletGreen} />
      </View>
    ) : (
      <View key={index} style={theme.bank.shadow.bullet} />
    ),
  );

  return (
    <View
      style={{
        height: props.height ?? 'auto',
      }}
    >
      <ScrollView
        horizontal
        onScroll={handleOnScroll}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
      >
        <View style={theme.bank.container.centeredItems}>
          {props.cardType === ICardType.TOUCH_EVENT_CARD &&
            props.data.map((card: any) => {
              return <TouchEventCard key={card.uid} {...card} onPress={props.onPress} />;
            })}
          {props.cardType === ICardType.EVENT_CARD_DELETE &&
            props.data.map((card: any) => {
              return <EventCardDelete key={card.uid} {...card} onDelete={handleOnDelete} />;
            })}
        </View>
      </ScrollView>
      <View style={styles.containerBullets}>{bullets}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBullets: {
    position: 'relative',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
