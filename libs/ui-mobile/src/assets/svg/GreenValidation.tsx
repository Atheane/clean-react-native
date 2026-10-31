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

export const GreenValidation = ({
  width = 23,
  height = 23,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 23 23" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        id="Union_25"
        data-name="Union 25"
        d="M11.5,1.84A9.66,9.66,0,1,1,4.669,4.669,9.662,9.662,0,0,1,11.5,1.84M11.5,0a11.5,11.5,0,1,0,8.132,3.368A11.5,11.5,0,0,0,11.5,0Z"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
      <Path
        id="Union_26"
        data-name="Union 26"
        d="M4,10.859H0V8H4V0H6.858V10.859Z"
        transform="translate(12.796 3.403) rotate(45)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
