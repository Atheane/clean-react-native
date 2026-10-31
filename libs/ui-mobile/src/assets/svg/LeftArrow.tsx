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

export const LeftArrow = ({
  width = 32,
  height = 18,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 32 18" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M.131,16.375a.094.094,0,0,1-.019-.025C.1,16.337.1,16.338.093,16.325A.077.077,0,0,0,.074,16.3c-.006-.006-.006-.012-.012-.025s0-.019-.006-.025-.006-.019-.013-.025S.037,16.206.03,16.2s-.006-.019-.013-.025a.286.286,0,0,1-.006-.031c0-.012-.006-.019-.006-.025S0,16.094,0,16.088a.05.05,0,0,0-.006-.025A.831.831,0,0,0,0,15.944.05.05,0,0,1,0,15.919c.006-.013,0-.025.006-.031a.039.039,0,0,0,.006-.025.286.286,0,0,0,.006-.031.033.033,0,0,1,.012-.025c.006-.006.006-.019.012-.025s.006-.019.012-.025.006-.019.012-.025.006-.012.012-.025A.065.065,0,0,1,.1,15.682a.077.077,0,0,0,.019-.025c.007-.013.012-.012.019-.025L.178,15.6h0L8.59,7.183a.591.591,0,0,1,.831.037.578.578,0,0,1,0,.787L2,15.413H31.409a.587.587,0,0,1,0,1.175H2L9.4,23.994a.588.588,0,1,1-.831.831L.165,16.406c-.013-.012-.025-.019-.038-.031Z"
        transform="translate(0.007 -7.03)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
