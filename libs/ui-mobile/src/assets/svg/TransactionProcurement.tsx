import Svg, { Circle, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const TransactionProcurement = ({ width = 28, height = 28, color = '#32c06e', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" style={style}>
      <Circle cx={14} cy={14} r={14} fill={color} />

      <Path
        id="np_double-arrow_2271561_000000"
        d="M9.966,13.251h4.417V11.263c0-.5.166-.939.773-.386l4.583,4.086a.414.414,0,0,1,0,.663l-4.583,4.086c-.663.608-.773.055-.773-.442V17.393H9.966a.849.849,0,0,1-.828-.828V14.08a.813.813,0,0,1,.828-.828Zm2.374,5.135H7.979V16.454c0-.552-.221-.994-.828-.442L2.568,20.1a.47.47,0,0,0,0,.717L7.151,24.9c.663.552.828,0,.828-.5V22.527H12.34a.861.861,0,0,0,.883-.828V19.215a.827.827,0,0,0-.883-.828Z"
        transform="translate(2.629 -4.257)"
        fill="#fff"
        fillRule="evenodd"
      />
    </Svg>
  );
};
