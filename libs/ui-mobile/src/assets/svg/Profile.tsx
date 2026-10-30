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

export const Profile = ({
  width = 30,
  height = 30,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 31.882 32.001" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        id="np_user_4584119_000000"
        d="M43.237,37.7a9.807,9.807,0,1,0-13.075,0,14.008,14.008,0,0,0-9.381,13.2,1.678,1.678,0,1,0,3.356,0A10.667,10.667,0,0,1,34.793,40.248h3.856A10.667,10.667,0,0,1,49.307,50.9a1.678,1.678,0,1,0,3.356,0A14.015,14.015,0,0,0,43.237,37.7ZM36.7,24.023a6.418,6.418,0,1,1-6.418,6.418A6.418,6.418,0,0,1,36.7,24.023Z"
        transform="translate(-20.781 -20.582)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
