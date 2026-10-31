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

export const Mail = ({
  width = 18,
  height = 13,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 18 13" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M18.023,5.463a.026.026,0,0,0,0-.015s0-.015,0-.023a.032.032,0,0,1,0-.015c0-.008,0-.012,0-.019a.1.1,0,0,0,0-.015A.068.068,0,0,0,18,5.356c0-.007,0-.012-.007-.015s0-.012-.007-.019l-.007-.015s-.007-.012-.011-.015-.007-.012-.011-.015a.055.055,0,0,1-.011-.015c0-.007-.014-.015-.021-.027h0a.121.121,0,0,0-.025-.023L17.89,5.2l-.014-.012L17.8,5.148l-.017-.008-.014,0-.035-.008-.014,0H.313L.26,5.137l-.014,0-.017.008-.07.039L.144,5.2l-.011.008a.3.3,0,0,0-.049.05.076.076,0,0,1-.014.023s-.007.012-.011.015a.031.031,0,0,0-.007.015s-.007.012-.007.015-.007.012-.011.019,0,.012-.007.015,0,.012-.007.015,0,.012,0,.019a.032.032,0,0,0,0,.015.19.19,0,0,0,0,.019.037.037,0,0,1,0,.019c0,.007,0,.012,0,.015V18.128a.359.359,0,0,0,.341.373H17.684a.359.359,0,0,0,.341-.373h0V5.463ZM9.013,14.445,1.163,5.871h15.7L9.012,14.445ZM.684,17.755V6.4l8.089,8.839a.319.319,0,0,0,.482,0h0L17.344,6.4V17.758H.685Z"
        transform="translate(-0.004 -5.125)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
