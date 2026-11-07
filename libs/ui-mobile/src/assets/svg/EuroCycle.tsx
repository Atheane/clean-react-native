import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const EuroCycle = ({
  width = 37.79,
  height = 32.006,
  startColor = '#113580',
  endColor = '#cb287d',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 37.79 32.006" style={style}>
      <Defs>
        {useGradient && (
          <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <Stop offset="0" stopColor={startColor} />
            <Stop offset="1" stopColor={endColor} />
          </LinearGradient>
        )}
      </Defs>
      <Path
        d="M21.49,14.043H10.238a.692.692,0,1,1,0-1.384H21.49a.692.692,0,0,1,0,1.384Zm0,5.5H10.261a.693.693,0,0,1,0-1.386H21.49a.692.692,0,0,1,0,1.384h0Zm1.247,8.144a.65.65,0,0,1-.077,0h0a11.915,11.915,0,0,1-.055-23.676L22.663,4a.615.615,0,0,1,.1-.007.692.692,0,0,1,.05,1.383h0a10.53,10.53,0,0,0-.049,20.925l.049,0a.692.692,0,0,1-.073,1.379h0ZM3.657,15.3H3.594a.692.692,0,0,1-.631-.689.553.553,0,0,1,0-.071v0a16,16,0,0,1,31.858-.064l.005.064a.6.6,0,0,1,0,.062.692.692,0,0,1-1.381.065v0a14.617,14.617,0,0,0-29.1-.06l-.005.06a.692.692,0,0,1-.689.633h0ZM18.9,32A16.009,16.009,0,0,1,3.282,19.5l-.02-.107a.678.678,0,0,1-.016-.148.692.692,0,0,1,1.368-.152v0a14.618,14.618,0,0,0,28.55.1l.018-.1a.693.693,0,1,1,1.353.3v0A16.032,16.032,0,0,1,18.9,32h0ZM3.727,17.7h0a.69.69,0,0,1-.489-.2L.2,14.469a.693.693,0,1,1,.978-.982l2.545,2.545,2.548-2.545a.692.692,0,1,1,.975.98h0L4.214,17.5a.686.686,0,0,1-.486.2h0Zm27.309,2.74a.692.692,0,0,1-.489-1.181l3.034-3.034a.69.69,0,0,1,.978,0h0l3.034,3.034a.692.692,0,0,1-.979.979L34.069,17.7l-2.548,2.545a.687.687,0,0,1-.486.2h0Z"
        transform="translate(0.001 0.006)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
    </Svg>
  );
};
