import Svg, { Defs, LinearGradient, Stop, Path, G } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Camera = ({
  width = 32,
  height = 34,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 32 34" style={style}>
      <Defs>
        {useGradient && (
          <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <Stop offset="0" stopColor={startColor} />
            <Stop offset="1" stopColor={endColor} />
          </LinearGradient>
        )}
      </Defs>
      <G id="gift" transform="translate(0 10)">
        <G id="camera" transform="translate(0 -10)">
          <Path id="Tracé_7161" data-name="Tracé 7161" d="M0,0H32V34H0Z" fill="none" />
          <Path
            id="Tracé_7162"
            data-name="Tracé 7162"
            d="M12.36,14.75,19.038,2.36A13.218,13.218,0,0,0,7.152,5.375L12.276,14.9l.084-.15Zm17-2.25a14.65,14.65,0,0,0-8.4-9.51L15.832,12.5ZM29.72,14H19.234l.406.75L26.3,27.125A15.463,15.463,0,0,0,30,17a16.234,16.234,0,0,0-.28-3ZM11.156,17,5.7,6.875A15.537,15.537,0,0,0,2,17a16.234,16.234,0,0,0,.28,3H12.766ZM2.644,21.5a14.65,14.65,0,0,0,8.4,9.51l5.124-9.51Zm15.778,0-5.46,10.14a13.218,13.218,0,0,0,11.886-3.015L19.724,19.1l-1.3,2.4Z"
            transform="translate(0 0)"
            fill={useGradient ? 'url(#linear-gradient)' : color}
          />
        </G>
      </G>
    </Svg>
  );
};
