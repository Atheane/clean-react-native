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

export const FlyFrom = ({
  width = 37,
  height = 37,
  startColor = '#cb287d',
  endColor = '#113580',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 37 37" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M28.053,53.622l6.832,3.209,3.352,6.689a1.36,1.36,0,0,0,.969.747,1.685,1.685,0,0,1,.286.048,1.378,1.378,0,0,0,.937-.365L42.574,61.8A1.333,1.333,0,0,0,42.94,60.6l-.89-5.164,6.927-6.927,6.879,12.233a1.505,1.505,0,0,0,1.017.794,2.064,2.064,0,0,1,.238.048,1.378,1.378,0,0,0,.937-.365l2.145-2.145a1.559,1.559,0,0,0,.413-1.255L56.19,41.356l7.022-7.022a4.417,4.417,0,0,0-.143-5.958,4.058,4.058,0,0,0-2.923-1.207,3.955,3.955,0,0,0-2.923,1.207L50.248,35.4,33.677,30.982h-.191a1.378,1.378,0,0,0-.937.365L30.4,33.492a1.245,1.245,0,0,0-.365,1.16,1.487,1.487,0,0,0,.747,1.064l12.281,6.927L36.14,49.57l-5.068-.89h-.286a1.181,1.181,0,0,0-.89.365l-2.272,2.272a1.333,1.333,0,0,0-.365,1.207,1.536,1.536,0,0,0,.794,1.1Z"
        transform="translate(-27.23 -27.169)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
