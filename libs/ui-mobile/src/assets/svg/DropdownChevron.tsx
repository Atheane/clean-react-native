import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path, G } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const DropdownChevron = ({
  width = 21,
  height = 13,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 21.14 12.824" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="back" transform="translate(0 12.824) rotate(-90)">
        <Path
          id="np_arrow_1920908_000000"
          d="M0,2.257A2.288,2.288,0,0,1,.645.673,2.24,2.24,0,0,1,3.8.673l6.764,6.755L17.331.652A2.236,2.236,0,1,1,20.49,3.817l-8.342,8.36a2.2,2.2,0,0,1-1.58.646,2.3,2.3,0,0,1-1.58-.646L.645,3.839A2.327,2.327,0,0,1,0,2.257Z"
          transform="translate(12.824) rotate(90)"
          fill={useGradient ? 'url(#linear-gradient)' : color || 'currentColor'}
        />
      </G>
    </Svg>
  );
};
