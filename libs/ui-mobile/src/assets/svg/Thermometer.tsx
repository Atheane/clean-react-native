import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Thermometer = ({ width = 40.017, height = 57.967, color = '#e36070', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 40.017 57.967" style={style}>
      <G transform="translate(-18.75 -6.25)">
        <Path
          id="Path_7804"
          data-name="Path 7804"
          d="M52.139,72.756a4.319,4.319,0,1,1-4.321-4.318,4.322,4.322,0,0,1,4.321,4.318"
          transform="translate(-8.357 -20.999)"
          fill={color}
        />
        <Path
          id="Path_7805"
          data-name="Path 7805"
          d="M50.726,41.519V13.329a7.079,7.079,0,1,0-14.158,0v28.19a12.473,12.473,0,1,0,14.183,0ZM43.661,58.836a7.078,7.078,0,0,1-1.379-14.02V13.647a1.379,1.379,0,1,1,2.758,0l0,31.171a7.078,7.078,0,0,1-1.379,14.02Z"
          transform="translate(-4.2)"
          fill="#fff"
        />
        <Path
          id="Path_7806"
          data-name="Path 7806"
          d="M27.029,56.926h-6.9a1.379,1.379,0,1,1,0-2.758h6.9a1.379,1.379,0,1,1,0,2.758Z"
          transform="translate(0 -16.181)"
          fill="#fff"
        />
        <Path
          id="Path_7807"
          data-name="Path 7807"
          d="M28.437,47.032H24.3a1.379,1.379,0,0,1,0-2.758h4.14a1.379,1.379,0,0,1,0,2.758Z"
          transform="translate(-1.407 -12.84)"
          fill="#fff"
        />
        <Path
          id="Path_7808"
          data-name="Path 7808"
          d="M27.029,37.137h-6.9a1.379,1.379,0,1,1,0-2.758h6.9a1.379,1.379,0,1,1,0,2.758Z"
          transform="translate(0 -9.498)"
          fill="#fff"
        />
        <Path
          id="Path_7809"
          data-name="Path 7809"
          d="M28.437,27.239H24.3a1.379,1.379,0,1,1,0-2.758h4.14a1.379,1.379,0,1,1,0,2.758Z"
          transform="translate(-1.407 -6.156)"
          fill="#fff"
        />
        <Path
          id="Path_7810"
          data-name="Path 7810"
          d="M27.029,17.344h-6.9a1.379,1.379,0,1,1,0-2.758h6.9a1.379,1.379,0,1,1,0,2.758Z"
          transform="translate(0 -2.815)"
          fill="#fff"
        />
        <Path
          id="Path_7811"
          data-name="Path 7811"
          d="M70.808,18.7a4.14,4.14,0,1,1,4.14-4.14A4.152,4.152,0,0,1,70.808,18.7Zm0-5.519a1.379,1.379,0,1,0,1.379,1.379A1.384,1.384,0,0,0,70.808,13.179Z"
          transform="translate(-16.181 -1.407)"
          fill="#fff"
        />
      </G>
    </Svg>
  );
};
