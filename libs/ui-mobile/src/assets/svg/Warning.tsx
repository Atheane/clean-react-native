import Svg, { Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Warning = ({ width = 24, height = 24, color = '#f0f0f0', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" style={style}>
      <Path
        d="M23.869,11.8A12.068,12.068,0,1,0,35.937,23.869,12.107,12.107,0,0,0,23.869,11.8Zm1.106,20.282a1.61,1.61,0,0,1-1.106.474,1.481,1.481,0,0,1-1.106-.474,1.6,1.6,0,0,1-.474-1.138,1.481,1.481,0,0,1,.474-1.106,1.61,1.61,0,0,1,1.106-.474,1.481,1.481,0,0,1,1.106.474,1.565,1.565,0,0,1,0,2.244Zm.474-5.97a1.58,1.58,0,1,1-3.159,0v-9.32a1.58,1.58,0,1,1,3.159,0Z"
        transform="translate(-11.801 -11.801)"
        fill={color}
      />
    </Svg>
  );
};
