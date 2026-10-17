/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { Colors } from '../../../constants';

type IProps = {
  background: () => JSX.Element;
  children: React.ReactNode;
  initialScroll: number;
  window: number;
};

export const ScrollBackground = (props: IProps) => {
  const scrollRef = useRef();
  const HEIGHT = Dimensions.get('window').height * props.window;

  useEffect(() => {
    setTimeout(() => {
      if (!scrollRef.current) {
        return;
      }
      // @ts-ignore
      scrollRef.current.scrollTo({ y: props.initialScroll, animated: true });
    }, 1);
  }, [props.initialScroll]);

  return (
    <ScrollView
      contentContainerStyle={styles(HEIGHT).container}
      // @ts-ignore
      ref={scrollRef}
      endFillColor={Colors.background.lightGreen}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles(HEIGHT).background}>
        <props.background />
      </View>
      <View style={styles(HEIGHT).content}>{props.children}</View>
    </ScrollView>
  );
};

const styles = (height: number) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    background: {
      height: height,
    },
    content: {
      flexGrow: 1,
      position: 'absolute',
      top: 0,
      left: 0,
    },
  });
