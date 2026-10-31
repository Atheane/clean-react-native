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

export const Logout = ({
  width = 32,
  height = 29,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 32 29" style={style}>
      <Defs>
        {useGradient && (
          <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1">
            <Stop offset="0" stopColor={startColor} />
            <Stop offset="1" stopColor={endColor} />
          </LinearGradient>
        )}
      </Defs>
      <Path
        d="M14.6,22.124a.585.585,0,1,0,.828.828l6.533-6.534q.021-.021.039-.043l.014-.019.02-.027a.21.21,0,0,0,.014-.024c0-.008.01-.017.015-.025s.008-.017.012-.025a.169.169,0,0,0,.012-.027c0-.01.006-.016.009-.025a.247.247,0,0,0,.01-.029c0-.01,0-.017.006-.025s.006-.02.008-.031a.135.135,0,0,1,0-.029c0-.01,0-.019,0-.028a.223.223,0,0,0,0-.052v-.064a.051.051,0,0,0,0-.028c0-.009,0-.019,0-.029s0-.021-.008-.031,0-.017-.006-.025-.007-.019-.01-.029-.006-.017-.009-.025-.008-.018-.012-.027l-.012-.025c0-.008-.01-.017-.015-.025l-.014-.024c0-.008-.013-.018-.02-.027L22,15.631q-.019-.023-.039-.043L15.429,9.054a.585.585,0,1,0-.828.828l5.534,5.534H.586a.586.586,0,0,0,0,1.172h19.55ZM27.779,5.814A14.413,14.413,0,0,0,4.846,9.272l-.038.078a.578.578,0,0,0-.066.271.586.586,0,0,0,1.1.274l0,0A13.227,13.227,0,0,1,17.571,2.767h.019a13.238,13.238,0,1,1,0,26.476h0a13.223,13.223,0,0,1-11.4-6.509l-.034-.062a.586.586,0,0,0-1.092.3.579.579,0,0,0,.082.3l0,0a14.417,14.417,0,0,0,12.442,7.15h0a14.41,14.41,0,0,0,10.188-24.6h0Z"
        transform="translate(-0.019 -1.594)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
