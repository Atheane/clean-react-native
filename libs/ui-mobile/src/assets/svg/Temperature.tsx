import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  circleColor?: string;
  style?: StyleProp<ViewStyle>;
};

export const Temperature = ({
  width = 24.162,
  height = 35,
  color = '#0a7dc0',
  circleColor = '#0a7dc0',
  style,
}: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24.162 35" style={style}>
      <G transform="translate(-18.75 -6.25)">
        <Path
          d="M48.716,71.045a2.608,2.608,0,1,1-2.609-2.607,2.609,2.609,0,0,1,2.609,2.607"
          transform="translate(-14.852 -37.318)"
          fill={circleColor}
        />
        <Path
          d="M42.985,27.545V10.524a4.274,4.274,0,1,0-8.548,0V27.545a7.531,7.531,0,1,0,8.564,0ZM38.718,38a4.274,4.274,0,0,1-.833-8.465V10.716a.833.833,0,1,1,1.665,0l0,18.82A4.274,4.274,0,0,1,38.72,38Z"
          transform="translate(-7.463)"
          fill={color}
        />
        <Path
          d="M23.749,55.833H19.583a.833.833,0,1,1,0-1.665h4.166a.833.833,0,1,1,0,1.665Z"
          transform="translate(0 -28.755)"
          fill={color}
        />
        <Path
          d="M26.25,45.939h-2.5a.833.833,0,1,1,0-1.665h2.5a.833.833,0,0,1,0,1.665Z"
          transform="translate(-2.501 -22.818)"
          fill={color}
        />
        <Path
          d="M23.749,36.044H19.583a.833.833,0,1,1,0-1.665h4.166a.833.833,0,1,1,0,1.665Z"
          transform="translate(0 -16.88)"
          fill={color}
        />
        <Path
          d="M26.25,26.146h-2.5a.833.833,0,1,1,0-1.665h2.5a.833.833,0,1,1,0,1.665Z"
          transform="translate(-2.501 -10.94)"
          fill={color}
        />
        <Path
          d="M23.749,16.251H19.583a.833.833,0,1,1,0-1.665h4.166a.833.833,0,1,1,0,1.665Z"
          transform="translate(0 -5.002)"
          fill={color}
        />
        <Path
          d="M69.167,15.417a2.5,2.5,0,1,1,2.5-2.5A2.507,2.507,0,0,1,69.167,15.417Zm0-3.332a.833.833,0,1,0,.833.833A.835.835,0,0,0,69.167,12.085Z"
          transform="translate(-28.755 -2.501)"
          fill={color}
        />
      </G>
    </Svg>
  );
};
