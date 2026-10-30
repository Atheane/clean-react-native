import Svg, { Image, Defs, Pattern, Rect, G, Circle } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';
import { ISvgComponent } from '../../types';

type IProps = {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export const RedCross: ISvgComponent = ({ width = 33, height = 33, style }: IProps) => {
  return (
    <Svg width={width} height={height} style={style}>
      <Defs>
        <Pattern id="pattern" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 6250 6250">
          <Image
            id="bankIcon"
            width={6250}
            height={6250}
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        </Pattern>
      </Defs>
      <G id="Composant_257_2" data-name="Composant 257 – 2">
        <Circle
          id="Ellipse_1105"
          data-name="Ellipse 1105"
          cx={width / 2}
          cy={width / 2}
          r={width / 2}
          fill="#fff"
        />
      </G>
      <Rect
        id="vecteezy_cross-check-icon-symbol-on-transparent-background_17178563_364"
        width={width}
        height={height}
        rx={width / 2}
        transform="translate(2 2)"
        fill="url(#pattern)"
      />
    </Svg>
  );
};
