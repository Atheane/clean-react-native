import React from 'react';
import Svg, { Image } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export const CertificateBlueGradient = ({ width = 29, height = 29, style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 29 29" style={style}>
      <Image
        id="use-2"
        data-name="use"
        width="29"
        height="29"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
      />
    </Svg>
  );
};
