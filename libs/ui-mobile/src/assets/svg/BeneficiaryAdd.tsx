import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Circle, Path, G } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const BeneficiaryAdd = ({
  width = 68,
  height = 68,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 68 68" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="Composant_216_2" transform="translate(15 8)">
        <G transform="matrix(1, 0, 0, 1, -15, -8)" filter="url(#Ellipse_6)">
          <Circle id="Ellipse_6-2" cx="19" cy="19" r="19" transform="translate(15 8)" fill="#fff" />
        </G>
        <Path
          id="user_select"
          d="M34.126,30.427a5.516,5.516,0,0,0,.311-8.118,5.961,5.961,0,0,0-8.392,0,5.516,5.516,0,0,0,.311,8.118,8.316,8.316,0,0,0-4.037,2.939,7.892,7.892,0,0,0-1.538,4.656,1,1,0,0,0,1.994,0,6.035,6.035,0,0,1,1.857-4.332,6.443,6.443,0,0,1,4.476-1.8H31.4a6.446,6.446,0,0,1,4.477,1.8,6.045,6.045,0,0,1,1.857,4.332,1,1,0,0,0,1.994,0,7.889,7.889,0,0,0-1.549-4.661,8.308,8.308,0,0,0-4.052-2.934Zm-3.885-7.866a3.817,3.817,0,0,1,3.523,2.279,3.6,3.6,0,0,1-.827,4.022,3.9,3.9,0,0,1-4.156.8,3.692,3.692,0,0,1-2.355-3.41,3.755,3.755,0,0,1,3.814-3.692Z"
          transform="translate(-13.304 -9.831)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Union_12"
          d="M2.9,7.241V5.793H1.448a1.448,1.448,0,0,1,0-2.9H2.9V1.448a1.448,1.448,0,0,1,2.9,0V2.9H7.24a1.448,1.448,0,1,1,0,2.9H5.792V7.241a1.448,1.448,0,0,1-2.9,0Z"
          transform="translate(24.667 13.117)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
