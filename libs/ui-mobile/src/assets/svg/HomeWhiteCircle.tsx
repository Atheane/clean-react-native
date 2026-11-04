import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path, Circle, G } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const HomeWhiteCircle = ({
  width = 57,
  height = 57,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 57 57" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Circle cx="28.5" cy="28.5" r="28.5" fill="#fdfdfd" />
      <G transform="translate(14 11)">
        <Path
          d="M23.937,9.046H24v1.129L27.6,13V9.046h.066a.975.975,0,0,0,0-1.944H23.937a.975.975,0,0,0,0,1.944ZM7.012,21.234a2.02,2.02,0,0,1-2.961-.511,2.413,2.413,0,0,1,.473-3.2L16.9,7.8a2,2,0,0,1,2.525.029l12.343,9.69a2.413,2.413,0,0,1,.473,3.2,2.02,2.02,0,0,1-2.961.511L18.148,12.491Zm1.284.24V32.827A3.17,3.17,0,0,0,11.328,36.1h3.615V25.767a3.053,3.053,0,0,1,2.923-3.158h.566a3.053,3.053,0,0,1,2.923,3.158V36.1h3.615A3.17,3.17,0,0,0,28,32.825V21.474l-9.852-7.733Z"
          transform="translate(-3.648 -7.102)"
          fillRule="evenodd"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
