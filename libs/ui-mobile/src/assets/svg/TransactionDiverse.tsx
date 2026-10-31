import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const TransactionDiverse = ({ width = 28, height = 28, color = '#00cbcc', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" style={style}>
      <Circle cx={14} cy={14} r={14} fill={color} />
      <Path
        d="M2.781,15.254H15.219A2.788,2.788,0,0,1,18,18.035v6.947a2.788,2.788,0,0,1-2.781,2.781H2.781A2.788,2.788,0,0,1,0,24.982V18.035a2.788,2.788,0,0,1,2.781-2.781Zm5.074,7.969L2.782,23.21A.607.607,0,0,1,2.789,22l5.073.013A.607.607,0,0,1,7.855,23.223Zm5.86-.7a1.381,1.381,0,1,1-.946,2.387,1.381,1.381,0,1,1,0-2.012A1.373,1.373,0,0,1,13.715,22.52Zm-5.86,2.865-5.073-.013a.607.607,0,0,1,.008-1.213l5.073.013A.607.607,0,0,1,7.855,25.386Zm9.124-4.637H1.021v4.234a1.767,1.767,0,0,0,1.76,1.76H15.219a1.767,1.767,0,0,0,1.76-1.76ZM1.021,18.172H16.979v-.137a1.767,1.767,0,0,0-1.76-1.76H2.781a1.767,1.767,0,0,0-1.76,1.76Z"
        transform="translate(5 -7.254)"
        fill="#fff"
      />
    </Svg>
  );
};
