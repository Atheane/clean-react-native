import React from 'react';
import Svg, { Circle, G, Rect } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Plus = ({ width = 66, height = 66, color = '#113580', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 66 66" style={style}>
      <G transform="matrix(1, 0, 0, 1, 0, 0)">
        <Circle
          id="Ellipse_1156-2"
          data-name="Ellipse 1156"
          cx="24"
          cy="24"
          r="24"
          transform="translate(9 6)"
          fill={'#fff'}
        />
      </G>
      <G id="Group_1908" data-name="Group 1908" transform="translate(-328 -275.57)">
        <Rect
          id="Rectangle_3493"
          data-name="Rectangle 3493"
          width="18"
          height="5"
          rx="2.5"
          transform="translate(351 303.07)"
          fill={color}
        />
        <Rect
          id="Rectangle_3494"
          data-name="Rectangle 3494"
          width="18"
          height="5"
          rx="2.5"
          transform="translate(357.5 314.57) rotate(-90)"
          fill={color}
        />
      </G>
    </Svg>
  );
};
