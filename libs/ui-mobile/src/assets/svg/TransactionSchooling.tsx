import Svg, { Circle, G, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const TransactionSchooling = ({ width = 28, height = 28, color = '#d99b26', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" style={style}>
      <Circle cx={14} cy={14} r={14} fill={color} />
      <G transform="translate(2.475 -11.521)">
        <Path
          d="M7.323,53.486h-2.2l.734-2.691V46.067l.734.326v4.362Z"
          transform="translate(-2.071 -21.721)"
          fill="#fff"
        />
        <Path
          d="M12.467,27.362l-5.4-2.384L4.518,23.856l-.734-.326L2.5,22.98l1.264-.57,8.7-3.832,9.967,4.4-4.565,2Z"
          transform="translate(0 0)"
          fill="#fff"
        />
        <Path
          d="M31.905,54.736l-6.542,2.589L18.82,54.736a5.1,5.1,0,0,1,.673-2.65l5.87,2.568,5.85-2.568a4.874,4.874,0,0,1,.693,2.65Z"
          transform="translate(-12.896 -26.477)"
          fill="#fff"
        />
      </G>
    </Svg>
  );
};
