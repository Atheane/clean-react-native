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

export const Edit = ({
  width = 24,
  height = 24,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 24.127 24.143" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M16.761,12.5H19.28a1.216,1.216,0,1,1,0,2.433H16.847A32.54,32.54,0,0,0,13,15.055a2.451,2.451,0,0,0-1.527.59,2.454,2.454,0,0,0-.591,1.528,32.586,32.586,0,0,0-.122,3.842V27.1a32.6,32.6,0,0,0,.122,3.842,2.45,2.45,0,0,0,.591,1.527A2.45,2.45,0,0,0,13,33.058a32.6,32.6,0,0,0,3.842.122h6.082a32.619,32.619,0,0,0,3.843-.122,2.023,2.023,0,0,0,2.117-2.118,32.542,32.542,0,0,0,.123-3.842V24.665a1.216,1.216,0,1,1,2.433,0v2.518a33.33,33.33,0,0,1-.145,4.081,4.385,4.385,0,0,1-4.2,4.205,33.348,33.348,0,0,1-4.081.145H16.761a33.33,33.33,0,0,1-4.081-.145,4.822,4.822,0,0,1-2.924-1.281,4.82,4.82,0,0,1-1.281-2.924,33.328,33.328,0,0,1-.145-4.081V20.929a33.35,33.35,0,0,1,.145-4.081,4.821,4.821,0,0,1,1.281-2.923,4.821,4.821,0,0,1,2.924-1.281,33.328,33.328,0,0,1,4.081-.145Z"
        transform="translate(-8.33 -11.471)"
        fillRule="evenodd"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
      <Path
        d="M68.774,10.087a3.786,3.786,0,1,1,5.355,5.355l-.024.023L68.75,10.109Z"
        transform="translate(-51.11 -8.977)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
      <Path
        d="M42.943,18.75,36.91,24.783a8.072,8.072,0,0,0-.951,1.056,4.958,4.958,0,0,0-.474.85,8.166,8.166,0,0,0-.4,1.363l-.033.14c-.12.5-.229.961-.282,1.342a2.527,2.527,0,0,0,.144,1.4,2.432,2.432,0,0,0,1.26,1.244,2.535,2.535,0,0,0,1.4.125c.38-.058.838-.173,1.34-.3l.137-.035a8.088,8.088,0,0,0,1.329-.407,4.862,4.862,0,0,0,.825-.469,8.04,8.04,0,0,0,1.032-.929L48.3,24.1Z"
        transform="translate(-27.023 -15.897)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
