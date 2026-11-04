import React from 'react';
import Svg, { G, Defs, ClipPath, Circle, Rect } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export const FlagForPortugal = ({ width = 64, height = 64, style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100" style={style}>
      <Defs>
        <ClipPath id="circle">
          <Circle cx="50" cy="50" r="50" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#circle)">
        <Rect width="35" height="100" fill="#006600" />
        <Rect x="35" width="65" height="100" fill="#FF0000" />
      </G>
    </Svg>
  );
};
