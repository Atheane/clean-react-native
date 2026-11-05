import Svg, { Rect } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const WhiteEllipse = ({ width = 142.872, height = 50.289, color = '#fefefe', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 142.872 50.289" style={style}>
      <Rect
        id="Rectangle_3604"
        data-name="Rectangle 3604"
        width="142.872"
        height="50.289"
        rx="19"
        fill={color}
      />
    </Svg>
  );
};
