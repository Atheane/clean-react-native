import Svg, { Path, G } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const TransactionPro = ({ width = 28, height = 28, color = '#16367e', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" style={style}>
      <Path id="Tracé_7683" d="M14,0A14,14,0,1,1,0,14,14,14,0,0,1,14,0Z" fill={color} />
      <G id="np_professional_3201981_000000" transform="translate(-10.028 1.5)">
        <Path
          id="Tracé_7684"
          d="M37.872,6.535A4.035,4.035,0,1,1,33.836,2.5a4.035,4.035,0,0,1,4.035,4.035"
          transform="translate(-9.521)"
          fill="#fff"
        />
        <Path
          id="Tracé_7685"
          d="M26.892,46.7a5.368,5.368,0,0,1-2.577.659,5.306,5.306,0,0,1-2.577-.659A4.476,4.476,0,0,0,17.9,51.115V55.91a.959.959,0,0,0,.959.959H29.79a.959.959,0,0,0,.959-.959V51.115A4.479,4.479,0,0,0,26.892,46.7Zm-1.478,8.072-.979.9a.157.157,0,0,1-.22,0l-.979-.9a.228.228,0,0,1-.06-.16l.779-4.435h-.4a.158.158,0,0,1-.16-.16v-1.2a.158.158,0,0,1,.16-.16h1.538a.158.158,0,0,1,.16.16v1.2a.158.158,0,0,1-.16.16h-.4l.779,4.435a.225.225,0,0,1-.059.16Z"
          transform="translate(0 -35.369)"
          fill="#fff"
        />
      </G>
    </Svg>
  );
};
