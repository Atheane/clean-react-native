import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const TopBlueBg = ({ width = 441, height = 454.233, color = '#405098', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 441 454.233" style={style}>
      <Path
        id="Bloc-BG"
        d="M0,0H441a0,0,0,0,1,0,0V416.234a38,38,0,0,1-38,38H38a38,38,0,0,1-38-38V0A0,0,0,0,1,0,0Z"
        fill={color}
      />
    </Svg>
  );
};
