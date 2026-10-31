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

export const Flame = ({
  width = 16,
  height = 40,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 16 40" style={style}>
      <Defs>
        {useGradient && (
          <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <Stop offset="0" stopColor={startColor} />
            <Stop offset="1" stopColor={endColor} />
          </LinearGradient>
        )}
      </Defs>
      <Path
        d="M10.585.132l-.06.04L10.45.223c-.1.07-.217.153-.347.25L10,.553c-.337.256-.707.56-1.1.91A24.83,24.83,0,0,0,5.275,5.507,28.259,28.259,0,0,0,.068,20.832a13.253,13.253,0,0,0,.016,1.619A23.6,23.6,0,0,0,3.766,32.735a39.642,39.642,0,0,0,2.528,3.7l.105.138c.262.338.507.642.731.909l.086.1.1.123.092.106.044.05a.712.712,0,0,0,.921.126l.05-.033c.071-.048.174-.119.305-.213l.1-.075c.244-.178.51-.381.794-.61a22.659,22.659,0,0,0,2.709-2.581A15.672,15.672,0,0,0,16,27.859a12.014,12.014,0,0,0-1.457-9.08l-.054-.093a21.663,21.663,0,0,1-1.5-3.143,26.48,26.48,0,0,1-1.641-7.772,30.625,30.625,0,0,1,.135-5.55l.016-.138c.039-.315.08-.6.12-.844l.012-.071c.007-.045.015-.088.022-.126l.025-.134A.726.726,0,0,0,10.587.133ZM10,2.435l0,.033a32.365,32.365,0,0,0-.094,5.4,27.929,27.929,0,0,0,1.738,8.211,23.092,23.092,0,0,0,1.536,3.24l.069.119A10.545,10.545,0,0,1,14.6,27.5a14.258,14.258,0,0,1-3.333,5.988A21.22,21.22,0,0,1,8.733,35.9l-.06.049c-.179.144-.351.275-.511.4l-.05.036L8.1,36.371c-.206-.251-.43-.533-.669-.843A38.256,38.256,0,0,1,5,31.965a22.206,22.206,0,0,1-3.471-9.614,12.3,12.3,0,0,1-.015-1.439A26.772,26.772,0,0,1,6.44,6.38,23.365,23.365,0,0,1,9.847,2.574l.06-.054.1-.085Zm5.4,36.038a.737.737,0,0,1,.021,1.473H3.229a.737.737,0,0,1-.021-1.473H15.4Z"
        transform="translate(-0.051 -0.018)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
