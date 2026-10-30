import React from 'react';
import Svg, { Image } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export const CardBank = ({ width, height, style }: IProps) => (
  <Svg width={width} height={height} viewBox="0 0 80 80" style={style}>
    <Image
      id="carbon-footprint"
      width="80"
      height="80"
      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    />
  </Svg>
);
