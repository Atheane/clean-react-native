import React from 'react';
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

export const Challenge = ({
  width = 48.58,
  height = 48.826,
  startColor = '#c4277c',
  endColor = '#0c7bbe',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 48.58 48.826" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <Path
        id="Path_7997"
        d="M23.718,47.749h0a16.771,16.771,0,0,1-5.564-1.082l-.042-.015-.043-.013C12.465,44.927,6.1,39.6,2.582,33.7-.427,28.64-.82,22.373,1.476,16.048c2.39-5.914,5.093-8.191,10.678-11.965A24.1,24.1,0,0,1,25.1,0a12.7,12.7,0,0,1,5.98,1.309l.2.108.218.067A24.035,24.035,0,0,1,44.51,11.266l1.548,3.416.018.039.019.038c2.376,4.766,2.539,11.057.438,16.835-2.284,5.659-6.228,9.671-12.781,13C29.35,46.836,26.442,47.749,23.718,47.749Z"
        transform="translate(48.58 0.833) rotate(91)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
      <Path
        id="np_challenge_4201424_000000"
        d="M33.763,7.48a.626.626,0,0,0-.085.005l-.037.006H29.693a.821.821,0,0,0-.818.824v.34h-3.8a.822.822,0,0,0-.752,1.153l.94,2.14-.94,2.135a.821.821,0,0,0,.752,1.158h4.622a.822.822,0,0,0,.819-.824V14.08H32.95v5.094H30.505a.815.815,0,0,0-.584.24A.824.824,0,0,0,29.68,20v2.464H23.554a.821.821,0,0,0-.818.824v2.463H16.6a.82.82,0,0,0-.819.827v8.036h0a.821.821,0,0,0,.819.82H37.451a.82.82,0,0,0,.824-.82V20a.82.82,0,0,0-.824-.824H34.595V8.316a.822.822,0,0,0-.832-.836ZM30.512,9.135H32.95v3.3H30.512ZM26.333,10.3h2.542v3.3H26.326l.583-1.322a.823.823,0,0,0,0-.661Zm4.992,10.518h5.309V33.786H31.325Zm-6.951,3.287h5.307v9.681H24.374Zm-6.945,3.288h5.307v6.392H17.429Z"
        transform="translate(-4.209 1.397)"
        fill="#fff"
      />
    </Svg>
  );
};
