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

export const Copy = ({
  width = 78.263,
  height = 31,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 78.263 31" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G transform="translate(-143.737 -249)">
        <Path
          d="M7.4,6.973H9.39V3.734a2,2,0,0,1,1.991-1.991H18.6a2,2,0,0,1,1.991,1.991v7.221A2,2,0,0,1,18.6,12.946H16.613v3.239a2,2,0,0,1-1.991,1.991H7.4A2,2,0,0,1,5.41,16.185V8.964A2,2,0,0,1,7.4,6.973Zm3.1,0h4.118a2,2,0,0,1,1.991,1.991v2.869H18.6a.883.883,0,0,0,.879-.879V3.734a.883.883,0,0,0-.879-.879H11.382a.883.883,0,0,0-.879.879V6.973ZM9.95,8.086H7.4a.883.883,0,0,0-.879.879v7.221a.883.883,0,0,0,.879.879h7.221a.883.883,0,0,0,.879-.879V8.964a.883.883,0,0,0-.879-.879H9.948Z"
          transform="translate(138.328 254.151)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
