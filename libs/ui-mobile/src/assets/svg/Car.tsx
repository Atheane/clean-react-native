import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Car = ({
  width = 38,
  height = 38,
  startColor = '#CB287D',
  endColor = '#113580',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 38.151 38.149" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M50.1,33.09l-1.271-6.867c-.763-3.3-4.2-3.3-6.1-3.3H26.956c-1.908,0-5.468,0-6.1,3.307L19.581,33.09a18.739,18.739,0,0,1-2.8,5.088,3.544,3.544,0,0,0-1.018,2.542V50.895a3.826,3.826,0,0,0,3.815,3.815h1.271v3.178a3.178,3.178,0,0,0,6.357,0l0-3.178H42.472v3.178a3.178,3.178,0,0,0,6.357,0l0-3.178H50.1a3.826,3.826,0,0,0,3.815-3.815V40.72A3.55,3.55,0,0,0,52.9,38.176,12.612,12.612,0,0,1,50.1,33.09ZM44,28l1.781,8.9H23.9L25.685,28Zm-20.6,17.8a2.544,2.544,0,1,1,2.544-2.544A2.551,2.551,0,0,1,23.4,45.809Zm22.891,0a2.544,2.544,0,1,1,2.544-2.544A2.551,2.551,0,0,1,46.287,45.809Z"
        transform="translate(-15.766 -22.918)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
