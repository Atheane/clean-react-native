import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const TransactionArt = ({ width = 28, height = 28, color = '#e2d430', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" style={style}>
      <Circle cx={14} cy={14} r={14} fill={color} />
      <G id="np_art_5044830_000000" transform="translate(-1.872 -6.991)">
        <Path
          id="Tracé_7670"
          data-name="Tracé 7670"
          d="M80.651,37.3a9,9,0,0,0-.415-.8l-1.958,5.318a1.818,1.818,0,0,1-.321.544,3.429,3.429,0,0,0,2.863-4.645c-.053-.141-.109-.276-.169-.413Z"
          transform="translate(-56.536 -19.079)"
          fill="#fff"
        />
        <Path
          id="Tracé_7671"
          data-name="Tracé 7671"
          d="M12.879,15.014A9.012,9.012,0,0,0,7.532,26.847c.012.024.021.048.032.072a3.426,3.426,0,0,0,6,.585,6.408,6.408,0,0,1,2.966-2.41c.038-.015.077-.026.116-.041h0A2.372,2.372,0,0,1,18.13,23.73a1.856,1.856,0,0,1,.173-.837l3.029-6.559a9.032,9.032,0,0,0-8.454-1.32Zm-2.35,10.005a1.533,1.533,0,1,1,1.085-.449A1.534,1.534,0,0,1,10.529,25.019Zm1.917-4.409a1.533,1.533,0,1,1,1.085-.449A1.534,1.534,0,0,1,12.446,20.61Zm4.6-1.342a1.533,1.533,0,1,1,1.085-.449A1.534,1.534,0,0,1,17.046,19.268Z"
          transform="translate(0 -1.578)"
          fill="#fff"
        />
        <Path
          id="Tracé_7672"
          data-name="Tracé 7672"
          d="M63.589,12.572a.712.712,0,0,0-.92.359l-4.02,8.705a1.1,1.1,0,0,0,.2,1.219,1.621,1.621,0,0,0-1.863.955c-.621,1.5.361,2.157-.26,3.656a4.036,4.036,0,0,0,3.258-2.414,1.617,1.617,0,0,0-.479-1.874,1.092,1.092,0,0,0,1.164-.7l3.312-9a.712.712,0,0,0-.4-.9Z"
          transform="translate(-39.65)"
          fill="#fff"
        />
      </G>
    </Svg>
  );
};
