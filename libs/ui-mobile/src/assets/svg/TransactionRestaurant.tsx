import Svg, { Circle, G, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const TransactionRestaurant = ({ width = 28, height = 28, color = '#fc5c69', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" style={style}>
      <Circle cx={14} cy={14} r={14} fill={color} />
      <G transform="translate(-10.301 2.292)">
        <Path
          d="M56.578,6.959c0-2.114-1.557-4.459-2.979-4.459s-3,2.345-3,4.459a2.934,2.934,0,0,0,2.038,3.075l-.154,9.611a1.1,1.1,0,0,0,1.1,1.115,1.087,1.087,0,0,0,1.1-1.115l-.154-9.611a2.913,2.913,0,0,0,2.056-3.075Z"
          transform="translate(-26.091 0)"
          fill="#fff"
        />
        <Path
          d="M22.588,4.919a.476.476,0,0,0-.481.481v4a.213.213,0,0,1-.212.212h-.519a.213.213,0,0,1-.212-.212V5.38a.5.5,0,0,0-.481-.461A.476.476,0,0,0,20.2,5.4v4a.213.213,0,0,1-.212.212h-.519a.213.213,0,0,1-.212-.212V5.38a.481.481,0,0,0-.961,0v4.863a1.585,1.585,0,0,0,1.422,1.576l-.154,9.745a1.1,1.1,0,0,0,1.1,1.115,1.087,1.087,0,0,0,1.1-1.115l-.134-9.726a1.584,1.584,0,0,0,1.422-1.576V5.38a.468.468,0,0,0-.461-.461Z"
          transform="translate(0 -1.938)"
          fill="#fff"
        />
      </G>
    </Svg>
  );
};
