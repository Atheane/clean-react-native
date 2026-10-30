import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const TransactionHighTech = ({ width = 28, height = 28, color = '#7d32c0', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" style={style}>
      <Path id="Tracé_7639" d="M14,0A14,14,0,1,1,0,14,14,14,0,0,1,14,0Z" fill={color} />
      <Path
        id="np_computer_1646755_000000"
        d="M3.526,14.7H16.379a1.316,1.316,0,0,1,1.306,1.332v8.412a1.293,1.293,0,0,1-1.306,1.306H3.526A1.293,1.293,0,0,1,2.22,24.443V16.031A1.315,1.315,0,0,1,3.526,14.7ZM6.27,19.218l.523-2.168,2.142-.523,4.7,4.7L12.3,22.588,10.973,23.92l-4.7-4.7Zm1.568-1.1a.739.739,0,1,1,0,1.045A.741.741,0,0,1,7.837,18.121ZM0,26.533H7.759a1.1,1.1,0,0,0,1.1.914H11.05a1.1,1.1,0,0,0,1.1-.914h7.759c0,1.672-.549,2.221-1.8,2.221H1.8C.548,28.754,0,28.2,0,26.533ZM3.526,15.561H16.379a.464.464,0,0,1,.444.47v8.412a.458.458,0,0,1-.444.444H3.526a.458.458,0,0,1-.444-.444V16.032A.464.464,0,0,1,3.526,15.561Z"
        transform="translate(4.331 -7.754)"
        fill="#fff"
        fillRule="evenodd"
      />
    </Svg>
  );
};
