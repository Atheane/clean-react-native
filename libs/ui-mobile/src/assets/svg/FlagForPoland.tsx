import React from 'react';
import Svg, { Defs, ClipPath, Circle, Rect, G } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export const FlagForPoland = ({ width = 64, height = 64, style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100" style={style}>
      <Defs>
        <ClipPath id="circle">
          <Circle cx="50" cy="50" r="50" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#circle)">
        <Rect x="0" y="0" width="100" height="50" fill="#FFFFFF" />
        <Rect x="0" y="50" width="100" height="50" fill="#DC143C" />
      </G>
    </Svg>
  );
};
