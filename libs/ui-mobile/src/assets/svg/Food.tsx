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

export const Food = ({
  width = 30,
  height = 30,
  startColor = '#cb287d',
  endColor = '#113580',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 25.922 38.843" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        id="Tracé_7357"
        data-name="Tracé 7357"
        d="M63.316,11.986c0-4.5-3.313-9.486-6.338-9.486S50.6,7.488,50.6,11.986c0,3.6,1.8,5.766,4.335,6.542l-.327,20.444a2.339,2.339,0,0,0,2.33,2.372,2.313,2.313,0,0,0,2.33-2.372l-.327-20.444c2.576-.736,4.375-2.944,4.375-6.542Z"
        transform="translate(-37.394 -2.5)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
      <Path
        id="Tracé_7358"
        data-name="Tracé 7358"
        d="M27.419,4.941A1.013,1.013,0,0,0,26.4,5.963v8.505a.454.454,0,0,1-.45.45h-1.1a.454.454,0,0,1-.45-.45V5.922a1.06,1.06,0,0,0-1.022-.981,1.013,1.013,0,0,0-1.022,1.022v8.505a.454.454,0,0,1-.45.45h-1.1a.454.454,0,0,1-.45-.45l0-8.546a1.022,1.022,0,0,0-2.044,0V16.267a3.372,3.372,0,0,0,3.025,3.352L21,40.349a2.339,2.339,0,0,0,2.33,2.372,2.313,2.313,0,0,0,2.33-2.372l-.284-20.688A3.369,3.369,0,0,0,28.4,16.308V5.922a1,1,0,0,0-.981-.981Z"
        transform="translate(-18.301 -3.918)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
