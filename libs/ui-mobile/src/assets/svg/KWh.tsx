import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Circle, Polygon, Text } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const KWh = ({
  width = 40,
  height = 40,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100" style={style}>
      <Defs>
        <LinearGradient id="gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>

      <Circle cx="50" cy="50" r="48" stroke={color} strokeWidth="2" fill="#f0f0f0" />

      <Polygon
        points="50,15 40,45 55,45 45,75 65,35 50,35"
        fill={useGradient ? 'url(#gradient)' : color}
        stroke={color}
        strokeWidth="1"
      />

      <Text x="50%" y="90%" fontSize="16" textAnchor="middle" fill={color} fontFamily="Arial">
        kWh
      </Text>
    </Svg>
  );
};
