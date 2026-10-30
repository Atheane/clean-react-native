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

export const ShareIcon = ({
  width = 28,
  height = 24,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 28 24" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M5.164,22.178H5.126a.544.544,0,0,1-.476-.56V15.5c0-4.5,2.178-6.639,4-7.643A9.037,9.037,0,0,1,12.6,6.776h7.858v-2.5a.539.539,0,0,1,.513-.562.485.485,0,0,1,.348.15h0L27.834,10.5a.6.6,0,0,1,0,.823h0l-6.511,6.629a.488.488,0,0,1-.349.151.539.539,0,0,1-.513-.562h0v-2.5H12.6a6.273,6.273,0,0,0-5.712,3.278,9.893,9.893,0,0,0-1.213,3.318L5.67,21.7a.533.533,0,0,1-.507.482h0ZM12.605,7.9a8.2,8.2,0,0,0-3.522.978C6.822,10.134,5.676,12.36,5.676,15.5v2.866q.152-.308.335-.621a7.339,7.339,0,0,1,6.594-3.828h8.372a.539.539,0,0,1,.513.562h0v1.771l5.245-5.339L21.49,5.571V7.342h0a.539.539,0,0,1-.513.562h0ZM24.7,27.277H.512A.539.539,0,0,1,0,26.715H0V8.357a.539.539,0,0,1,.513-.562h3.72a.567.567,0,0,1,0,1.124H1.025V26.15H24.184V18.556a.514.514,0,1,1,1.025,0h0v8.158h0a.539.539,0,0,1-.513.562Z"
        transform="translate(0.001 -3.719)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
