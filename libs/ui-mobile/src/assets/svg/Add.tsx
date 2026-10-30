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

export const Add = ({
  width = 30,
  height = 30,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="more-info" transform="translate(0 0)">
        <Path
          id="more-info-2"
          data-name="more-info"
          d="M24.174,15.414H16.586V7.806a.586.586,0,0,0-1.172,0v.02h0v7.589H7.806a.586.586,0,0,0,0,1.172h7.608v7.588a.586.586,0,0,0,1.172,0h0V16.586h7.588a.586.586,0,0,0,0-1.172ZM27.313,4.688A16,16,0,1,0,4.684,27.309l0,0A16,16,0,0,0,27.309,4.684l0,0Zm-.828,21.8A14.828,14.828,0,0,1,5.516,5.514h0A14.828,14.828,0,1,1,26.486,26.484Z"
          transform="translate(0.165 0.165)"
          fillRule="evenodd"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
