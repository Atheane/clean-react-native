import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Eye = ({
  width = 30,
  height = 30,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" style={style}>
      <Defs>
        {useGradient && (
          <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <Stop offset="0" stopColor={startColor} />
            <Stop offset="1" stopColor={endColor} />
          </LinearGradient>
        )}
      </Defs>
      <Path
        d="M13,9C8,9,3.73,12.525,2,17.5,3.73,22.475,8,26,13,26s9.27-3.525,11-8.5C22.27,12.525,18,9,13,9Zm0,14.167c-2.76,0-5-2.539-5-5.667s2.24-5.667,5-5.667,5,2.539,5,5.667S15.76,23.167,13,23.167ZM13,14.1a3.221,3.221,0,0,0-3,3.4,3.221,3.221,0,0,0,3,3.4,3.221,3.221,0,0,0,3-3.4A3.221,3.221,0,0,0,13,14.1Z"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
