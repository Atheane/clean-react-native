import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  startColor?: string;
  endColor?: string;
  style?: StyleProp<ViewStyle>;
};

export const Validate = ({
  width = 32,
  height = 22,
  startColor,
  endColor,
  color = '#fff',
  style,
}: IProps) => {
  const useGradient = startColor && endColor;
  return (
    <Svg width={width} height={height} viewBox="0 0 32 22" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M10.126 22.453h0a.583.583 0 01-.414-.172L.172 12.739a.586.586 0 01.829-.829l9.125 9.125L31 .166a.586.586 0 01.829.829L10.544 22.281a.583.583 0 01-.414.172h0z"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
