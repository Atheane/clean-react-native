import React from 'react';
import Svg, { Defs, LinearGradient, Stop, G, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const SunAndCloud = ({
  width = 27.147,
  height = 21.668,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 27.147 21.668" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="np_sun-cloud_4821755_000000" transform="translate(-12.5 -20.071)">
        <Path
          id="Path_7998"
          data-name="Path 7998"
          d="M36.451,23.881A1.131,1.131,0,0,1,35.32,22.75V21.2a1.131,1.131,0,0,1,2.262,0V22.75A1.132,1.132,0,0,1,36.451,23.881Z"
          transform="translate(-14.56)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Path_7999"
          data-name="Path 7999"
          d="M15.179,45.153H13.631a1.131,1.131,0,0,1,0-2.262h1.548a1.131,1.131,0,0,1,0,2.262Z"
          transform="translate(0 -14.56)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Path_8000"
          data-name="Path 8000"
          d="M49.563,30.107a1.13,1.13,0,0,1-.8-1.93l1.094-1.094a1.131,1.131,0,1,1,1.6,1.6l-1.094,1.094a1.117,1.117,0,0,1-.8.331Z"
          transform="translate(-22.926 -4.262)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Path_8001"
          data-name="Path 8001"
          d="M21.411,30.107a1.128,1.128,0,0,1-.8-.331l-1.094-1.094a1.131,1.131,0,0,1,1.6-1.6l1.094,1.094a1.13,1.13,0,0,1-.8,1.93Z"
          transform="translate(-4.265 -4.262)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Path_8002"
          data-name="Path 8002"
          d="M20.611,56.355,19.516,57.45a1.127,1.127,0,0,0,1.244,1.835,6.731,6.731,0,0,1,.97-3.2,1.122,1.122,0,0,0-1.12.27Z"
          transform="translate(-4.265 -22.948)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Path_8003"
          data-name="Path 8003"
          d="M28.11,37.757A9.146,9.146,0,0,1,33,33.259a5.16,5.16,0,0,0-7.785,6.76,6.765,6.765,0,0,1,2.894-2.262Z"
          transform="translate(-7.403 -7.402)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Path_8004"
          data-name="Path 8004"
          d="M45.838,43.766a7.411,7.411,0,0,0-13.884,0A5.092,5.092,0,0,0,33.26,53.784H44.532a5.092,5.092,0,0,0,1.307-10.017Z"
          transform="translate(-9.989 -12.045)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
