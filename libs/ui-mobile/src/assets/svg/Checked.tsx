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

export const Checked = ({
  width = 39,
  height = 39,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 39 39" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        id="Union_7"
        data-name="Union 7"
        d="M-801.5-821.88a16.383,16.383,0,0,1,11.583,4.8,16.384,16.384,0,0,1,4.8,11.583,16.383,16.383,0,0,1-4.8,11.583,16.384,16.384,0,0,1-11.583,4.8,16.383,16.383,0,0,1-11.583-4.8,16.384,16.384,0,0,1-4.8-11.583,16.384,16.384,0,0,1,4.8-11.583,16.384,16.384,0,0,1,11.583-4.8m0-3.12a19.5,19.5,0,0,0-13.788,5.712A19.5,19.5,0,0,0-821-805.5a19.5,19.5,0,0,0,5.712,13.789A19.5,19.5,0,0,0-801.5-786a19.5,19.5,0,0,0,13.788-5.712A19.5,19.5,0,0,0-782-805.5a19.5,19.5,0,0,0-5.711-13.789A19.5,19.5,0,0,0-801.5-825Z"
        transform="translate(821 825)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
      <Path
        id="Union_10"
        data-name="Union 10"
        d="M4189,5051h-7v-5h7v-14h5v19Z"
        transform="translate(623.016 -6509.742) rotate(45)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
