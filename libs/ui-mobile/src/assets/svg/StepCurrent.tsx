import Svg, { Circle } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const StepCurrent = ({ width = 14, height = 14, color = '#113580', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" style={style}>
      <Circle cx="7" cy="7" r="7" fill={color} />
    </Svg>
  );
};
