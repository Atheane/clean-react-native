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

export const Activity = ({
  width = 32,
  height = 31,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 32.007 30.715" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M31.425,21.206H24.187L20.425,1.112A.581.581,0,0,0,19.75.649a.571.571,0,0,0-.469.494L15.806,27.8l-4.388-16.45a.581.581,0,0,0-.706-.412.571.571,0,0,0-.412.419L7.837,21.2H.574a.581.581,0,1,0,0,1.162H8.286a.577.577,0,0,0,.563-.438l2.025-8.113,4.563,17.113a.582.582,0,0,0,.556.431h.038a.581.581,0,0,0,.538-.5L19.956,4.9l3.188,16.981a.572.572,0,0,0,.569.469h7.706A.58.58,0,0,0,32,21.774a.564.564,0,0,0-.575-.569h0Z"
        transform="translate(0.007 -0.64)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
