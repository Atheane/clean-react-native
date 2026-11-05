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

export const GreenHouse = ({
  width = 18.777,
  height = 18.777,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 18.777 18.777" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        id="np_home_4668801_000000"
        d="M16.785,8.361h.043v.731l2.329,1.828V8.361H19.2a.631.631,0,0,0,0-1.258H16.785a.631.631,0,0,0,0,1.258ZM5.826,16.253a1.308,1.308,0,0,1-1.917-.331,1.562,1.562,0,0,1,.306-2.071l8.016-6.293a1.291,1.291,0,0,1,1.635.019l7.992,6.274a1.562,1.562,0,0,1,.306,2.071,1.308,1.308,0,0,1-1.917.331l-7.21-5.661Zm.832.156v7.351A2.053,2.053,0,0,0,8.621,25.88h2.341V19.188a1.977,1.977,0,0,1,1.893-2.045h.366a1.977,1.977,0,0,1,1.893,2.045v6.691h2.341a2.053,2.053,0,0,0,1.963-2.121v-7.35L13.037,11.4Z"
        transform="translate(-3.648 -7.102)"
        fillRule="evenodd"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
