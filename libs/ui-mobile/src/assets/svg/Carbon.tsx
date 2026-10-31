import React from 'react';
import Svg, { Defs, LinearGradient, Stop, G, Rect } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Carbon = ({
  width = 46,
  height = 23,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color = '#838383',
  style,
}: IProps) => {
  const useGradient = startColor && endColor;
  return (
    <Svg width={width} height={height} viewBox="0 0 46 23" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="Groupe_1683" data-name="Groupe 1683" transform="translate(-250 -685)">
        <G id="Groupe_1570" data-name="Groupe 1570" transform="translate(-219 -5983)">
          <Rect
            id="Rectangle_2266"
            data-name="Rectangle 2266"
            width="10"
            height="23"
            rx="3"
            transform="translate(469 6668)"
            fill={color}
          />
          <Rect
            id="Rectangle_2267"
            data-name="Rectangle 2267"
            width="10"
            height="17"
            rx="3"
            transform="translate(493 6674)"
            fill={color}
          />
          <Rect
            id="Rectangle_2265"
            data-name="Rectangle 2265"
            width="10"
            height="21"
            rx="3"
            transform="translate(481 6670)"
            fill={useGradient ? 'url(#linear-gradient)' : color}
          />
          <Rect
            id="Rectangle_2268"
            data-name="Rectangle 2268"
            width="10"
            height="12"
            rx="3"
            transform="translate(505 6679)"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
};
