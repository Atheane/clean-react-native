/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from 'react';
import { ScrollView, Dimensions, StyleSheet, View, ImageSourcePropType } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

import { TouchEventCard } from '../touch-event-card';

export type IPropsTouchEventCard = {
  uid: string;
  image?: ImageSourcePropType;
  icon?: React.FC<SvgProps>;
  title: string;
};

type IProps = {
  data: IPropsTouchEventCard[];
  height?: number;
  cardScrollRef?: React.RefObject<ScrollView>;
  onPress?: (uid: string) => void;
  onDelete?: (uid: string) => void;
};

export const CardScroller = (props: IProps) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const [data, setData] = useState<IPropsTouchEventCard[]>(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

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
    setData([...data] as IPropsTouchEventCard[]);
    props.onDelete?.(uid);
  };

  const { theme } = useTheme();

  const bullets = data.map((_, index) =>
    index === slideIndex ? (
      <View key={index} style={theme.shadow.bullet}>
        <View key={index} style={theme.container.bulletColor} />
      </View>
    ) : (
      <View key={index} style={theme.shadow.bullet} />
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
        ref={props.cardScrollRef}
      >
        <View style={theme.container.centeredItems}>
          {!props.onDelete &&
            props.data.map((card: IPropsTouchEventCard) => {
              return <TouchEventCard key={card.uid} {...card} onPress={props.onPress} />;
            })}
          {props.onDelete &&
            props.data.map((card: IPropsTouchEventCard) => {
              return (
                <TouchEventCard key={card.uid} {...card} onPress={props.onPress} onDelete={handleOnDelete} />
              );
            })}
        </View>
      </ScrollView>
      <View style={styles.containerBullets}>{bullets}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBullets: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
  },
});
