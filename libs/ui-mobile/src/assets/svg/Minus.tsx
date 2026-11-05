import React from 'react';
import Svg, { Path, G, Rect } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Minus = ({ width = 66, height = 66, color = '#113580', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 66 66" style={style}>
      <G transform="matrix(1, 0, 0, 1, 0, 0)">
        <Path
          id="Path_7908-2"
          data-name="Path 7908"
          d="M24,0A24,24,0,1,1,0,24,24,24,0,0,1,24,0Z"
          transform="translate(9 6)"
          fill={'#fff'}
        />
      </G>
      <G id="Group_1909" data-name="Group 1909" transform="translate(-328 -275.57)">
        <Rect
          id="Rectangle_3493"
          data-name="Rectangle 3493"
          width="18"
          height="5"
          rx="2.5"
          transform="translate(351 303.07)"
          fill={color}
        />
      </G>
    </Svg>
  );
};
