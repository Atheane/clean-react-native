import React from 'react';
import Svg, { Path, Defs, LinearGradient, G, Stop } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  startColor?: string;
  endColor?: string;
};

export const CloseBg = ({
  width = 15,
  height = 15,
  color,
  style,
  startColor = '#CFCE29',
  endColor = '#A1B201',
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 15 15" style={style}>
      <Defs>
        {useGradient && (
          <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <Stop offset="0" stopColor={startColor} />
            <Stop offset="1" stopColor={endColor} />
          </LinearGradient>
        )}
      </Defs>
      <G id="close-button-png-30230" transform="translate(-4.925 194.167)">
        <Path
          id="Tracé_7692"
          d="M11.752-194.137a7.586,7.586,0,0,0-6.7,5.969,9.143,9.143,0,0,0,0,3.012,7.671,7.671,0,0,0,5.861,5.858,8.839,8.839,0,0,0,3.03,0,7.674,7.674,0,0,0,5.853-5.85,8.825,8.825,0,0,0,0-3.028,7.667,7.667,0,0,0-3.26-4.764A7.273,7.273,0,0,0,11.752-194.137Zm-.579,5.232,1.293,1.292,1.293-1.292a17.445,17.445,0,0,1,1.364-1.284,5.268,5.268,0,0,1,1.071,1.07,17.439,17.439,0,0,1-1.285,1.364l-1.293,1.292,1.293,1.292a17.444,17.444,0,0,1,1.285,1.363,5.267,5.267,0,0,1-1.071,1.07,17.442,17.442,0,0,1-1.364-1.284l-1.293-1.292-1.293,1.292a17.441,17.441,0,0,1-1.364,1.284,5.267,5.267,0,0,1-1.071-1.07,17.445,17.445,0,0,1,1.285-1.363l1.293-1.292-1.293-1.292a17.439,17.439,0,0,1-1.285-1.364,5.268,5.268,0,0,1,1.071-1.07A17.445,17.445,0,0,1,11.173-188.905Z"
          transform="translate(0 0)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
