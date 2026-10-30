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

export const Blind = ({
  width = 30,
  height = 30,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 38 32" style={style}>
      <Defs>
        {useGradient && (
          <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <Stop offset="0" stopColor={startColor} />
            <Stop offset="1" stopColor={endColor} />
          </LinearGradient>
        )}
      </Defs>
      <Path
        d="M36.535,21.391a37.478,37.478,0,0,1,6.922,6.568s-9.75,14.147-23.342,9.852l3.84-3.79a9.9,9.9,0,0,0,1.212.1,6.21,6.21,0,0,0,6.215-6.215,4.924,4.924,0,0,0-.152-1.212l5.305-5.305Zm5.456-9.346a1.739,1.739,0,0,1,0,2.425L12.536,43.926A1.715,1.715,0,1,1,10.111,41.5L39.566,12.045a1.652,1.652,0,0,1,2.425,0ZM23.3,23.564a3.178,3.178,0,0,1,2.223.909L21.074,28.92a3.175,3.175,0,0,1-.909-2.223A3.115,3.115,0,0,1,23.3,23.564ZM4.959,26.747S16.125,9.922,31.736,18.31L27.694,22.3A6.217,6.217,0,0,0,18.9,31.094L14.86,35.186a33.5,33.5,0,0,1-9.9-8.437Z"
        transform="translate(-4.957 -11.515)"
        fillRule="evenodd"
        fill={useGradient ? 'url(#linear-gradient)' : color || 'currentColor'}
      />
    </Svg>
  );
};
