import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const TransactionBank = ({ width = 28, height = 28, color = '#587af4', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" style={style}>
      <G id="Composant_199_4" data-name="Composant 199 – 4">
        <Circle cx={14} cy={14} r={14} fill={color} />
      </G>
      <Path
        id="np_bank_607257_000000"
        d="M7.5,10.761v2.352H8.756v5.861H7.5v2.512H21.733V18.974H20.477V13.113h1.256V10.761L14.617,7.2Zm5.861,8.213H11.268V13.113h2.093Zm2.512-5.861h2.093v5.861H15.872Z"
        transform="translate(-0.5 -1.203)"
        fill="#fff"
      />
    </Svg>
  );
};
