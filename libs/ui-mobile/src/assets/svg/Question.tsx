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

export const Question = ({
  width = 30,
  height = 30,
  startColor = '#CB287D',
  endColor = '#113580',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M4.393,25.607A15,15,0,1,1,15,30,15,15,0,0,1,4.393,25.607ZM6.09,6.091A12.6,12.6,0,1,0,15,2.4,12.6,12.6,0,0,0,6.09,6.091ZM14.541,22.95c-.091-.018-.18-.033-.267-.057a1.662,1.662,0,1,1,.72.027l-.146.03Zm-.51-5.669a1.239,1.239,0,0,1-.681-.927,2.128,2.128,0,0,1,.36-1.591,4.376,4.376,0,0,1,.942-1c.392-.321.8-.627,1.2-.948a3.146,3.146,0,0,0,.821-.939,1.757,1.757,0,0,0-.21-1.95,1.61,1.61,0,0,0-.9-.5,2.867,2.867,0,0,0-1.4.024,1.706,1.706,0,0,0-1.083.9c-.141.263-.264.534-.4.8a1.922,1.922,0,0,1-.387.542,1.343,1.343,0,0,1-1.017.327,1.417,1.417,0,0,1-.642-.174,1.113,1.113,0,0,1-.6-.99,2.907,2.907,0,0,1,.6-1.836,4.637,4.637,0,0,1,1.8-1.458,5.492,5.492,0,0,1,1.708-.492l.336-.033.654.006.323.03a6.29,6.29,0,0,1,2.314.6,3.839,3.839,0,0,1,1.6,1.364,3.525,3.525,0,0,1,.543,1.554,3.428,3.428,0,0,1-.114,1.429,3.7,3.7,0,0,1-.87,1.473,9.947,9.947,0,0,1-1.5,1.233c-.3.207-.567.423-.848.639h0a1.8,1.8,0,0,0-.554.8c-.06.162-.129.324-.192.486a1.12,1.12,0,0,1-1.044.741,1.473,1.473,0,0,1-.76-.12Z"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
