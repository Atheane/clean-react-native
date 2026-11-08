import Svg, { Rect, Image } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const EnergyAppLogo = ({ width = 62.845, height = 44.073 }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 62.845 44.073">
      <Rect id="Rectangle_3586" data-name="Rectangle 3586" width={width} height={height} rx="7" fill="#fff" />
      <Image
        width={width}
        height={height}
        transform="translate(3.265 1.224)"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
      />
    </Svg>
  );
};
