/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from 'react';
import { ScrollView, Dimensions, StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Colors } from '../../constants';
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
  }, []);

  const handleOnDelete = (uid: string) => {
    const removeIndex = data.map((item) => item.uid).indexOf(uid);
    data.splice(removeIndex, 1);
    setData([...data]);
    if (props.onDelete) props.onDelete(uid);
  };

  const bullets = props.data.map((_, index) =>
    index === slideIndex ? (
      <View key={index} style={styles(props).bulletShadow}>
        <View key={index} style={styles(props).bulletGreen} />
      </View>
    ) : (
      <View key={index} style={styles(props).bulletShadow} />
    ),
  );

  return (
    <View style={styles(props).container}>
      <ScrollView
        horizontal
        onScroll={handleOnScroll}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles(props).cardsContainer}>
          {props.data.map((card: { uid: string; icon: React.FC<SvgProps>; text: string }) => {
            return <EventCard key={card.uid} {...card} onDelete={handleOnDelete} />;
          })}
        </View>
      </ScrollView>
      <View style={styles(props).bullets}>{bullets}</View>
    </View>
  );
};

const styles = (props: IProps) =>
  StyleSheet.create({
    container: {
      height: props.height ?? 'auto',
    },
    cardsContainer: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    bulletShadow: {
      backgroundColor: Colors.background.white,
      width: 20,
      height: 20,
      borderRadius: 50,
      marginHorizontal: 4,
      shadowColor: Colors.shadow.bold,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
    bulletGreen: {
      backgroundColor: Colors.background.lightGreen,
      width: 13,
      height: 13,
      borderRadius: 50,
      margin: 3.5,
    },
    bullets: {
      position: 'relative',
      top: 20,
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });
