import Svg, { Image, Defs, Pattern, Rect } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';
import { ISvgComponent } from '../../types';

type IProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export const BANKLogo: ISvgComponent = ({ width = 99, height = 39, style }: IProps) => {
  return (
    <Svg id="image-blanc" width={width} height={height} viewBox="0 0 98.863 38.775">
      <Defs>
        <Pattern id="pattern" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 836 329">
          <Image
            id="bankIcon"
            width={836}
            height={329}
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        </Pattern>
      </Defs>
      <Rect id="image-blanc-2" data-name="image-blanc" width="98.863" height="38.775" fill="url(#pattern)" />
    </Svg>
  );
};
