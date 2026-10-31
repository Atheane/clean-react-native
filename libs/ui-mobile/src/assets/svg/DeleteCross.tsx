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

export const DeleteCross = ({
  width = 24,
  height = 24,
  startColor = '#cb287d',
  endColor = '#113580',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M18.667,6.5a12,12,0,1,0,12,12,12,12,0,0,0-12-12Zm0,21.155A9.155,9.155,0,1,1,27.822,18.5,9.17,9.17,0,0,1,18.667,27.655Z"
        transform="translate(-6.668 -6.5)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
      <Path
        d="M41.33,33.409a1.585,1.585,0,0,0-2.249,0l-.026.026L37.37,35.12l-1.711-1.711a1.591,1.591,0,0,0-2.249,2.249L35.12,37.37l-1.711,1.711a1.591,1.591,0,0,0,2.249,2.249l1.711-1.711L39.055,41.3l.026.026a1.591,1.591,0,0,0,2.249-2.249l-.026-.026L39.619,37.37,41.3,35.685l.026-.026A1.6,1.6,0,0,0,41.33,33.409Z"
        transform="translate(-25.39 -25.342)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
