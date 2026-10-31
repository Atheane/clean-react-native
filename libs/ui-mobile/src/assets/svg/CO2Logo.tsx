import React from 'react';
import Svg, { Defs, Pattern, Image, Rect } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export const BankAltLogo = ({ width = 32, height = 32, style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" style={style}>
      <Defs>
        <Pattern id="pattern" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 668 668">
          <Image
            width={668}
            height={668}
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        </Pattern>
      </Defs>
      <Rect id="BigCO2coin" width={32} height={32} rx={16} fill="url(#pattern)" />
    </Svg>
  );
};
