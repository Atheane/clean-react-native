import React from 'react';
import Svg, { G, Circle } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Checkbox = ({ width = 23, height = 23, color = '#BFD23A', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 23 23" style={style}>
      <G id="Ellipse_1102" fill="#fff" stroke={color} strokeWidth="3">
        <Circle cx="11.5" cy="11.5" r="11.5" stroke="none" />
        <Circle cx="11.5" cy="11.5" r="10" fill="none" />
      </G>
      <Circle id="Ellipse_1103" cx="4.5" cy="4.5" r="4.5" transform="translate(7 7)" fill={color} />
    </Svg>
  );
};
