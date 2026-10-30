import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const TransactionHousing = ({ width = 28, height = 28, color = '#32c465', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" style={style}>
      <Circle cx={14} cy={14} r={14} fill={color} />
      <Path
        d="M16.528,10.108a1.992,1.992,0,0,0-2.761,0C4.41,18.86,12.758,11.118,7.3,16.1a.668.668,0,0,0,.875,1.01l.606-.538v6.4a1.8,1.8,0,0,0,1.75,1.818h9.155a1.754,1.754,0,0,0,1.75-1.818v-6.4l.606.538a.605.605,0,0,0,.942-.067.655.655,0,0,0-.067-.942Zm-1.347,3.366a1.414,1.414,0,1,1-1.414,1.414A1.381,1.381,0,0,1,15.182,13.474Zm2.221,9.9H13.027V20.947a2.221,2.221,0,0,1,4.443,0V23.37Z"
        transform="translate(-1.063 -4.553)"
        fill="#fff"
      />
    </Svg>
  );
};
