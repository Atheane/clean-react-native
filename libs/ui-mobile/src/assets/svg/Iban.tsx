import Svg, { Defs, LinearGradient, Stop, G, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Iban = ({
  width = 58,
  height = 20,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 58 20" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="wallett" transform="translate(0 0)">
        <Path
          id="wallett-2"
          data-name="wallett"
          d="M19.436,1.938H3.064A3.067,3.067,0,0,0,0,5V18.665a3.068,3.068,0,0,0,3.064,3.064H19.436A3.068,3.068,0,0,0,22.5,18.665V5a3.067,3.067,0,0,0-3.064-3.064h0Zm0,18.966H3.064A2.242,2.242,0,0,1,.822,18.663h0V5A2.242,2.242,0,0,1,3.064,2.76H19.436A2.242,2.242,0,0,1,21.677,5h0V7.865H17.9a3.968,3.968,0,0,0,0,7.937h3.773v2.863a2.242,2.242,0,0,1-2.24,2.24h0Zm2.242-5.927H17.9a3.144,3.144,0,0,1,0-6.289h3.773Zm-5.42-3.144a1.766,1.766,0,1,0,1.766-1.766h0a1.768,1.768,0,0,0-1.766,1.766h0Zm1.767-.943a.943.943,0,1,1-.943.943h0a.944.944,0,0,1,.943-.943ZM4.551,4.2H3.8a.412.412,0,1,0,0,.824h.753a.412.412,0,0,0,0-.824h0Zm10.654.824h1.639a.412.412,0,0,0,0-.824h-1.64a.412.412,0,1,0,0,.824ZM8.649,4.2H7.01a.412.412,0,0,0,0,.824h1.64a.412.412,0,0,0,0-.824Zm4.1,0H11.108a.412.412,0,0,0,0,.824h1.64a.412.412,0,0,0,0-.824ZM19.3,5.02h.753a.412.412,0,1,0,0-.824H19.3a.412.412,0,1,0,0,.824ZM3.874,18.421H3.12a.412.412,0,0,0,0,.824h.754a.412.412,0,0,0,0-.824Zm12.293,0H14.528a.412.412,0,0,0,0,.824h1.64a.412.412,0,0,0,0-.824Zm-4.1,0H10.417a.412.412,0,0,0,0,.824H12.07a.412.412,0,0,0,0-.824Zm-4.1,0H6.333a.412.412,0,0,0,0,.824h1.64a.412.412,0,0,0,0-.824Zm11.408,0h-.754a.412.412,0,0,0,0,.824h.755a.412.412,0,0,0,0-.824Z"
          transform="translate(0 -1.938)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
