import Svg, { Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const StepDone = ({ width = 14, height = 14, color = '#a2b302', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" style={style}>
      <Path
        d="M7,0A7,7,0,1,1,0,7,7,7,0,0,1,7,0ZM3.389,7.7A.915.915,0,0,1,4.732,6.46L6.056,7.89,9.239,4.137a.917.917,0,0,1,1.4,1.185L6.808,9.84a.919.919,0,0,1-1.392.052Z"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  );
};
