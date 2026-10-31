import Svg, { Image } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';
import { ISvgComponent } from '../../types';

type IProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export const OffBlueGradient: ISvgComponent = ({ width = 35, height = 35, style }: IProps) => {
  return (
    <Svg width={width} height={height} style={style}>
      <Image
        id="sign-out"
        width={width}
        height={height}
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
      />
    </Svg>
  );
};
