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

export const Energy = ({
  width = 42,
  height = 42,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 42 41.989" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M30.906,10a1.584,1.584,0,0,0-.984.41L10.5,28.252a1.574,1.574,0,0,0,1.066,2.739h3.674v17.32a3.7,3.7,0,0,0,3.674,3.674H43.059a3.7,3.7,0,0,0,3.674-3.674V30.991h3.674a1.574,1.574,0,0,0,1.066-2.739L32.054,10.408A1.577,1.577,0,0,0,30.906,10Zm.082,3.723L46.356,27.842h-1.2a1.575,1.575,0,0,0-1.575,1.575V48.311a.493.493,0,0,1-.525.525h-10.5v-4.4a6.335,6.335,0,0,0,4.724-6.1V35.715a1.577,1.577,0,0,0-1.05-1.476V31.516a1.575,1.575,0,1,0-3.149,0V34.14h-4.2V31.516a1.575,1.575,0,1,0-3.149,0v2.706a1.574,1.574,0,0,0-1.05,1.493v2.624a6.335,6.335,0,0,0,4.724,6.1v4.4h-10.5a.493.493,0,0,1-.525-.525V29.417a1.575,1.575,0,0,0-1.575-1.575h-1.2ZM27.839,37.289h6.3v1.05a3.149,3.149,0,1,1-6.3,0Z"
        transform="translate(-9.988 -9.996)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
