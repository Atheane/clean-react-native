import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Humidity = ({ width = 26.365, height = 34.467, color = '#0a7dc0', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 26.365 34.467" style={style}>
      <G transform="translate(-21.54 -13.477)">
        <Path
          d="M59.941,64.54a1.357,1.357,0,0,1-2.714,0,1.357,1.357,0,0,1,2.714,0"
          transform="translate(-19.157 -26.683)"
          fill={color}
        />
        <Path
          d="M39.628,53.8a1.357,1.357,0,0,1-2.714,0,1.357,1.357,0,0,1,2.714,0"
          transform="translate(-8.253 -20.917)"
          fill={color}
        />
        <Path
          d="M41.427,22.33a51.607,51.607,0,0,1-5.9-8.368.9.9,0,0,0-1.616.025,46.093,46.093,0,0,1-6.193,8.936C24.539,26.8,21.54,30.47,21.54,34.763a13.183,13.183,0,0,0,26.365,0c0-4.44-3.146-8.321-6.477-12.432ZM26.852,32.881a3.167,3.167,0,1,1,3.166,3.166,3.166,3.166,0,0,1-3.166-3.166Zm4.827,8.5a.9.9,0,1,1-1.494-1.019l7.534-11.044h0a.9.9,0,1,1,1.494,1.019Zm7.748-.355a3.167,3.167,0,1,1,3.166-3.166,3.166,3.166,0,0,1-3.166,3.166Z"
          transform="translate(0 0)"
          fill={color}
        />
      </G>
    </Svg>
  );
};
