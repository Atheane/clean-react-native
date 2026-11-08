import Svg, { G, Image } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export const FlagForPortugal = ({ width = 90, height = 90, style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 90 90" style={style}>
      <G transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#monde)">
        <Image
          id="monde-2"
          data-name="monde"
          width={width}
          height={height}
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />
      </G>
    </Svg>
  );
};
