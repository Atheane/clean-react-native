import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const TransactionAlcohol = ({ width = 28, height = 28, color = '#bc1347', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" style={style}>
      <Circle cx={14} cy={14} r={14} fill={color} />
      <G transform="translate(-8.399 1.474)">
        <Path
          d="M58.58,45.333l-.52-3.019a.509.509,0,0,0-.479-.416H53.105a.474.474,0,0,0-.479.416l-.52,3.019a3.375,3.375,0,0,0,.479,2.416,3.218,3.218,0,0,0,2.394,1.436v3.331a.25.25,0,0,1-.229.25l-1.416.188a.267.267,0,0,0-.229.25.253.253,0,0,0,.25.25h3.935a.253.253,0,0,0,.25-.25.25.25,0,0,0-.229-.25l-1.395-.167a.267.267,0,0,1-.229-.25V49.206a3.321,3.321,0,0,0,2.9-3.873Zm-2.186-.791c-1.5-.125-1.915,1.02-3.5.542l.416-2.436h4.06l.416,2.394a2.707,2.707,0,0,0-1.395-.5Z"
          transform="translate(-28.232 -31.195)"
          fill="#fff"
        />
        <Path
          d="M20.543,15.728V14.5h-2.27v1.228a2.886,2.886,0,0,1-.937,2.145,2.917,2.917,0,0,0-.937,2.145v11.1a.649.649,0,0,0,.646.646h4.767a.649.649,0,0,0,.646-.646V20.038a2.886,2.886,0,0,0-.937-2.145,2.893,2.893,0,0,1-.978-2.166Zm.729,12.825a.427.427,0,0,1-.438.438H18a.44.44,0,0,1-.438-.438V22.641A.44.44,0,0,1,18,22.2h2.832a.44.44,0,0,1,.438.438Z"
          transform="translate(0 -9.501)"
          fill="#fff"
        />
        <Path
          d="M27.591,2.875a.373.373,0,0,0-.375-.375h-1.54a.373.373,0,0,0-.375.375V4.187H27.57V2.875Z"
          transform="translate(-7.049)"
          fill="#fff"
        />
      </G>
    </Svg>
  );
};
