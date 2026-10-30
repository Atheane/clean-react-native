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

export const Heat = ({
  width = 37,
  height = 40,
  startColor = '#CB287D',
  endColor = '#113580',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 37 40" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="np_heating_3127411_000000" transform="translate(-5.903 -2.488)">
        <Path
          id="Tracé_7739"
          d="M24.959,16.064a1.505,1.505,0,0,0,.8-2.011l-.5-1.173a2.423,2.423,0,0,1,.335-2.43,5.427,5.427,0,0,0,.376-6.24l-.586-1a1.523,1.523,0,1,0-2.6,1.592l.628,1a2.4,2.4,0,0,1-.167,2.765,5.4,5.4,0,0,0-.754,5.529l.5,1.173a1.507,1.507,0,0,0,1.423.921,1.42,1.42,0,0,0,.545-.126Z"
          transform="translate(-9.381)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7740"
          d="M42.754,14.055l-.5-1.173a2.423,2.423,0,0,1,.335-2.43,5.427,5.427,0,0,0,.376-6.24l-.586-1.006a1.523,1.523,0,1,0-2.6,1.592l.628,1a2.4,2.4,0,0,1-.167,2.765,5.4,5.4,0,0,0-.754,5.529l.5,1.173a1.507,1.507,0,0,0,1.423.921A1.337,1.337,0,0,0,42,16.065a1.52,1.52,0,0,0,.754-2.009Z"
          transform="translate(-19.26 -0.001)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7741"
          d="M59.947,4.211l-.628-1.006a1.523,1.523,0,1,0-2.6,1.592l.586,1a2.4,2.4,0,0,1-.167,2.765,5.4,5.4,0,0,0-.754,5.529l.5,1.173a1.507,1.507,0,0,0,1.423.921,1.338,1.338,0,0,0,.586-.126,1.539,1.539,0,0,0,.8-2.011l-.5-1.173a2.423,2.423,0,0,1,.335-2.43,5.35,5.35,0,0,0,.421-6.239Z"
          transform="translate(-29.081 0)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7742"
          d="M10.677,42.6H7.662A1.769,1.769,0,0,0,5.9,44.361V63.8a1.769,1.769,0,0,0,1.759,1.759h3.016A1.769,1.769,0,0,0,12.436,63.8V44.4a1.778,1.778,0,0,0-1.759-1.8Z"
          transform="translate(0 -23.311)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7743"
          d="M31.376,42.6H28.361A1.769,1.769,0,0,0,26.6,44.361V63.8a1.769,1.769,0,0,0,1.759,1.759h3.016A1.769,1.769,0,0,0,33.135,63.8V44.4a1.778,1.778,0,0,0-1.759-1.8Z"
          transform="translate(-12.029 -23.311)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7744"
          d="M51.978,42.6H48.963A1.769,1.769,0,0,0,47.2,44.361V63.8a1.769,1.769,0,0,0,1.759,1.759h3.016A1.769,1.769,0,0,0,53.737,63.8V44.4a1.779,1.779,0,0,0-1.759-1.8Z"
          transform="translate(-24.001 -23.311)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7745"
          d="M72.677,42.6H69.662A1.769,1.769,0,0,0,67.9,44.361V63.8a1.769,1.769,0,0,0,1.759,1.759h3.016A1.769,1.769,0,0,0,74.436,63.8V44.4a1.778,1.778,0,0,0-1.759-1.8Z"
          transform="translate(-36.03 -23.311)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7746"
          d="M89.2,47a1.306,1.306,0,0,0-1.3,1.3v2.932a1.3,1.3,0,1,0,2.6,0V48.3A1.306,1.306,0,0,0,89.2,47Z"
          transform="translate(-47.65 -25.867)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
