import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path, G } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const KycW9 = ({
  width = 28.027,
  height = 40.527,
  startColor = '#CB287D',
  endColor = '#113580',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 28.027 40.527" style={style}>
      <Defs>
        <LinearGradient
          id="linear-gradient"
          x1="1.046"
          y1="0.426"
          x2="-0.25"
          y2="0.422"
          gradientUnits="objectBoundingBox"
        >
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="icon_formulaire-w9" opacity="0.996">
        <Path
          id="Union_24"
          data-name="Union 24"
          d="M5965.4-173.475l-6.934-6.937V-214h28.026v40.528Zm-5.347-8.054h6.468v6.471l18.388,0v-37.357h-24.856Zm4.881,5.347v-3.764h-3.761Zm11.337-3.561,1.121-1.121,1.561,1.561,3.143-3.142,1.122,1.121-4.267,4.264Zm.1-3.932v-1.585h6.748v1.585Zm-7.153-6.771v-1.585h13.9v1.585Zm-7.377,0v-1.585h6.748v1.585Zm7.377-2.106v-1.585h13.9v1.585Zm-7.377,0v-1.585h6.748v1.585Zm3.1-4.163V-198.3h15.083v1.585Zm4.279-4.283v-1.585h13.9V-201Zm-7.377,0v-1.585h6.748V-201Zm7.377-2.1v-1.585h13.9v1.585Zm-7.377,0v-1.585h6.748v1.585Zm3.1-4.163v-1.585h15.083v1.585Z"
          transform="translate(-5958.467 214.002)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
