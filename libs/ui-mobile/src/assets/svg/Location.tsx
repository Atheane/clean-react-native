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

export const Location = ({
  width = 22,
  height = 32,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 22 32" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="icon_pin" transform="translate(0)">
        <Path
          id="Tracé_7613"
          d="M35.931,12.16a6.611,6.611,0,1,1-6.65,6.65A6.634,6.634,0,0,1,35.931,12.16Zm0,1.442a5.169,5.169,0,0,0,0,10.338,5.169,5.169,0,0,0,0-10.338Z"
          transform="translate(-25.034 -8.233)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7614"
          d="M27.027,0A10.927,10.927,0,0,1,38,10.9c0,5.289-2.885,8.414-5.449,12.5l-5.529,8.894L21.5,23.4c-2.565-4.087-5.369-7.212-5.369-12.5A10.909,10.909,0,0,1,27.027,0Zm0,1.523A9.336,9.336,0,0,0,17.652,10.9c0,4.807,2.8,7.933,5.129,11.7l4.247,6.891L31.275,22.6c2.4-3.767,5.209-6.891,5.209-11.7a9.4,9.4,0,0,0-9.456-9.375Z"
          transform="translate(-16.129)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
