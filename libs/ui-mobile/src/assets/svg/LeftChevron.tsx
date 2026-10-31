import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const LeftChevron = ({
  width = 16,
  height = 26,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 16 26" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M0,2.785A2.82,2.82,0,0,1,.8.831,2.773,2.773,0,0,1,4.7.831l8.364,8.336L21.43.8A2.762,2.762,0,0,1,25.336,4.71L15.021,15.027a2.723,2.723,0,0,1-1.954.8,2.847,2.847,0,0,1-1.954-.8L.8,4.737A2.868,2.868,0,0,1,0,2.785Z"
        transform="translate(15.824) rotate(90)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
