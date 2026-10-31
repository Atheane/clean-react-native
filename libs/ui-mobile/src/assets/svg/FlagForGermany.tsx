import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export const FlagForGermany = ({ width = 64, height = 64, style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 64 64" style={style}>
      <Path d="M31.9 2C18.8 2 7.7 10.4 3.6 22h56.6C56.1 10.4 45 2 31.9 2z" fill="#3e4347" />
      <Path d="M31.9 62c13.1 0 24.2-8.3 28.3-20H3.6c4.1 11.7 15.2 20 28.3 20z" fill="#ffe62e" />
      <Path
        d="M3.6 22c-1.1 3.1-1.7 6.5-1.7 10s.6 6.9 1.7 10h56.6c1.1-3.1 1.7-6.5 1.7-10s-.6-6.9-1.7-10H3.6"
        fill="#ed4c5c"
      />
    </Svg>
  );
};
