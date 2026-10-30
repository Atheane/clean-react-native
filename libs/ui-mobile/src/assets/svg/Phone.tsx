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

export const Phone = ({
  width = 30,
  height = 30,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 24.805 31.999" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="phone" transform="translate(0 0)">
        <Path
          id="phone-2"
          data-name="phone"
          d="M21.816,32h-.031a3.324,3.324,0,0,1-.732-.082l.022,0a18.509,18.509,0,0,1-8.716-2.695l.081.046A18.413,18.413,0,0,1,3.593,13.55v-.1A18.485,18.485,0,0,1,5.936,4.563l-.048.094c.871-1.581,4.388-4.1,4.786-4.383L10.7.256l.027-.015a1.9,1.9,0,0,1,2.58.722l.005.009,4.737,8.473a1.9,1.9,0,0,1-.721,2.579l-.009.005-2.3,1.283a5.538,5.538,0,0,1-4.72.308l.037.013A11.649,11.649,0,0,0,15.766,23.4l.048.028a5.55,5.55,0,0,1,2.7-3.806l.027-.014,2.3-1.285a1.9,1.9,0,0,1,2.579.721l0,.009,4.734,8.475a1.9,1.9,0,0,1-.721,2.579l-.009,0a20.154,20.154,0,0,1-2.18,1.041l-.145.053A9.34,9.34,0,0,1,21.818,32ZM11.322,1.25c-1.041.744-3.786,2.843-4.408,3.973a17.18,17.18,0,0,0-2.148,8.228v.1a17.214,17.214,0,0,0,8.206,14.677l.075.043a17.174,17.174,0,0,0,8.1,2.481l.041,0h.063l.059.016a6.338,6.338,0,0,0,3.349-.648,20.349,20.349,0,0,0,2.307-1.087l-.108.055a.728.728,0,0,0,.278-.993l0,0L22.4,19.629a.728.728,0,0,0-.993-.278l0,0-2.3,1.285a4.371,4.371,0,0,0-2.218,3.759v0l-.011.956-.848-.444a12.842,12.842,0,0,1-6.87-11.358q0-.464.032-.918l0,.041.063-.954.821.492a4.369,4.369,0,0,0,4.388.069l-.022.011,2.3-1.285a.728.728,0,0,0,.278-.993l0,0L12.289,1.543a.732.732,0,0,0-.97-.292l0,0Z"
          transform="translate(-3.593 -0.001)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
