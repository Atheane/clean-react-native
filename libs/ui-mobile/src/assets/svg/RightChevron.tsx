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

export const RightChevron = ({
  width = 9,
  height = 14,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 9 14" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G transform="translate(8.824 14.14) rotate(180)">
        <Path
          d="M0,1.553A1.6,1.6,0,0,1,.431.463a1.469,1.469,0,0,1,2.113,0L7.069,5.112,11.592.449a1.469,1.469,0,0,1,2.113,0,1.581,1.581,0,0,1,0,2.178L8.125,8.379a1.451,1.451,0,0,1-1.057.445,1.517,1.517,0,0,1-1.057-.445L.431,2.642A1.626,1.626,0,0,1,0,1.553Z"
          transform="translate(8.824) rotate(90)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
