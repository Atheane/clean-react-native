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

export const EnergyConsumption = ({
  width = 57,
  height = 57,
  startColor = '#4a90e2',
  endColor = '#465a9c',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 57.229 57.229" style={style}>
      <Defs>
        <LinearGradient
          id="energy-linear-gradient"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M8.294,63.479H61.436a2.044,2.044,0,1,0,0-4.088H59.392V32.821a2.043,2.043,0,0,0-2.044-2.044H47.128a2.043,2.043,0,0,0-2.044,2.044V59.392H43.04V41A2.043,2.043,0,0,0,41,38.953H30.777A2.043,2.043,0,0,0,28.733,41v18.4H26.689V47.128a2.043,2.043,0,0,0-2.044-2.044H14.426a2.043,2.043,0,0,0-2.044,2.044V59.392H10.338V32.821a2.044,2.044,0,0,0-4.088,0V61.436A2.043,2.043,0,0,0,8.294,63.479ZM55.3,59.392H49.172V34.865H55.3Zm-16.351,0H32.821V43.04h6.132ZM22.6,49.172v10.22H16.47V49.172ZM51.763,18.9l-11.413,3.8a2.041,2.041,0,0,0-1.106.889l-5.536,9.225H24.646a2.046,2.046,0,0,0-1.446.6L17.068,39.55a2.043,2.043,0,1,0,2.89,2.89l5.534-5.531h9.374a2.038,2.038,0,0,0,1.753-.994l5.743-9.571,10.248-3.418-.125.307a2.043,2.043,0,1,0,3.781,1.551l2.192-5.347a2.04,2.04,0,0,0-1.116-2.665l-5.35-2.192a2.043,2.043,0,1,0-1.548,3.781ZM18.513,6.25A12.263,12.263,0,1,0,30.777,18.513,12.27,12.27,0,0,0,18.513,6.25Zm0,4.088a8.176,8.176,0,1,1-8.176,8.176,8.18,8.18,0,0,1,8.176-8.176Zm-1.827,3.173L14.643,17.6a2.041,2.041,0,0,0,1.827,2.959h.782l-.565,1.129a2.043,2.043,0,1,0,3.656,1.827l2.044-4.088a2.042,2.042,0,0,0-1.829-2.956h-.782l.565-1.129a2.043,2.043,0,1,0-3.653-1.829Z"
        transform="translate(-6.25 -6.25)"
        fill={useGradient ? 'url(#energy-linear-gradient)' : color}
        fillRule="evenodd"
      />
    </Svg>
  );
};
