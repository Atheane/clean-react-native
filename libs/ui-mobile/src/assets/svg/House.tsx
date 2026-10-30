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

export const House = ({
  width = 35,
  height = 28,
  startColor = '#CB287D',
  endColor = '#113580',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 35 28" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="np_house_983462_000000" transform="translate(-3.744 -12.598)">
        <Path
          id="Tracé_7427"
          d="M41.818,49.6V37.086L28.733,26.769,15.649,37.086V49.6H41.818Z"
          transform="translate(-7.453 -8.872)"
          fillRule="evenodd"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7428"
          d="M5.583,28.816l15.7-12.376L37.073,28.891l1.9-2.407L34.3,22.8V13.484H28.278v4.571L21.357,12.6,3.744,26.484Z"
          fillRule="evenodd"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
