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

export const Lock = ({
  width = 20,
  height = 32,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 20 32" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M25.25,12.338h-.962V8.288a10.186,10.186,0,0,0-1.025-4.112C22.313,2.27,20.282,0,16,0S9.688,2.27,8.739,4.176A10.214,10.214,0,0,0,7.714,8.288v4.05H6.751a.573.573,0,0,0-.575.575V31.419a.573.573,0,0,0,.575.575h18.5a.573.573,0,0,0,.575-.575h0V12.913a.566.566,0,0,0-.575-.575ZM8.869,8.287a9.15,9.15,0,0,1,.919-3.631c1.175-2.325,3.269-3.5,6.213-3.5s5.038,1.175,6.212,3.5a9.055,9.055,0,0,1,.919,3.631v4.05H8.87V8.287ZM24.675,30.844H7.325V13.494h17.35ZM16,18.506a3.664,3.664,0,0,0-.581,7.282v2.55a.581.581,0,1,0,1.162,0v-2.55A3.664,3.664,0,0,0,16,18.507Zm.575,6.1v-.894a.581.581,0,0,0-1.162,0v.894a2.508,2.508,0,1,1,3.019-1.863,2.486,2.486,0,0,1-1.856,1.863h0Z"
        transform="translate(-6.176 -0.001)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
