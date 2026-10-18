/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from 'react';
import { ScrollView, Dimensions, StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

import { EventCard } from '../event-card';

type IProps = {
  data: {
    uid: string;
    icon: React.FC<SvgProps>;
    text: string;
  }[];
  height?: number;
};

type IState = {
  onDelete?: (uid: string) => void;
};

export const CardScroller = (props: IProps & IState) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleOnScroll = useCallback((event: any) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const cardWidth = Dimensions.get('window').width * 0.5 + 20;
    const index = Math.round(scrollOffset / cardWidth);
    setSlideIndex(index);
  }, []);

  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const handleOnDelete = (uid: string) => {
    const removeIndex = data.map((item) => item.uid).indexOf(uid);
    data.splice(removeIndex, 1);
    setData([...data]);
    if (props.onDelete) props.onDelete(uid);
  };

  const { theme } = useTheme();

  const bullets = props.data.map((_, index) =>
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
        <View style={[theme.bank.container.centeredItems]}>
          {props.data.map((card: { uid: string; icon: React.FC<SvgProps>; text: string }) => {
            return <EventCard key={card.uid} {...card} onDelete={handleOnDelete} />;
          })}
        </View>
      </ScrollView>
      <View style={[styles.containerBullets]}>{bullets}</View>
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
