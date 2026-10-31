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

export const Home = ({
  width = 30,
  height = 30,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        id="np_home_4668801_000000"
        d="M20.438,8.711h.055v.934l2.976,2.336V8.711h.055a.807.807,0,0,0,0-1.608H20.438a.807.807,0,0,0,0,1.608ZM6.432,18.8a1.672,1.672,0,0,1-2.45-.423,2,2,0,0,1,.391-2.648L14.618,7.684a1.651,1.651,0,0,1,2.089.024l10.215,8.019a2,2,0,0,1,.391,2.648,1.672,1.672,0,0,1-2.45.423l-9.216-7.236Zm1.063.2v9.4A2.624,2.624,0,0,0,10,31.1H13V22.549a2.527,2.527,0,0,1,2.419-2.614h.468A2.527,2.527,0,0,1,18.3,22.549V31.1h2.991A2.624,2.624,0,0,0,23.8,28.39V19l-8.153-6.4Z"
        transform="translate(-3.648 -7.102)"
        fillRule="evenodd"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
