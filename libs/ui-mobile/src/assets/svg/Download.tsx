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

export const Download = ({
  width = 30,
  height = 30,
  startColor = '#cb287d',
  endColor = '#113580',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 26.5 27.797" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="download" transform="translate(-2 -4.493)">
        <Path
          id="Tracé_7718"
          data-name="Tracé 7718"
          d="M10.166,11.6,8.1,13.65,8,.041,4.786.035l.1,13.608L2.789,11.59a1.626,1.626,0,0,0-2.275,0A1.569,1.569,0,0,0,.53,13.826l0,0,0,0,6,5.883,5.9-5.842.009-.009h0l.009-.009h0Z"
          transform="translate(9.183 4.457) rotate(1)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7720"
          data-name="Tracé 7720"
          d="M4.65,14.94c0-1.916,1.186-3.47,2.65-3.47A1.572,1.572,0,0,0,8.625,9.735,1.572,1.572,0,0,0,7.3,8C4.373,8,2,11.107,2,14.94V25.35c0,3.833,2.373,6.94,5.3,6.94H21.875c3.659,0,6.625-3.884,6.625-8.675V14.94C28.5,11.107,26.127,8,23.2,8a1.572,1.572,0,0,0-1.325,1.735A1.572,1.572,0,0,0,23.2,11.47c1.464,0,2.65,1.553,2.65,3.47v8.675c0,2.875-1.78,5.2-3.975,5.2H7.3c-1.464,0-2.65-1.553-2.65-3.47Z"
          transform="translate(0 0)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
