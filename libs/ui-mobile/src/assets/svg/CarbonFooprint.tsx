import React from 'react';
import Svg, { Image } from 'react-native-svg';
import { StyleProp, ViewStyle, Platform } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

const MobileCarbonFootprint = () => (
  <Svg width="80" height="80" viewBox="0 0 80 80">
    <Image
      id="carbon-footprint"
      width="80"
      height="80"
      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    />
  </Svg>
);

const WebCarbonFootprint = ({ width = 80, height = 80, style }: IProps) => {
  return (
    <Svg width={width} height={height} style={style}>
      <Image
        id="bankIcon"
        width={width}
        height={height}
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
      />
    </Svg>
  );
};

export const CarbonFootprint = Platform.OS === 'web' ? WebCarbonFootprint : MobileCarbonFootprint;
