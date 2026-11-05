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

export const SunnyHouse = ({
  width = 133,
  height = 133,
  startColor = '#9fb100',
  endColor = '#d0cf2a',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 133.009 133.351" style={style}>
      <Defs>
        {useGradient && (
          <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <Stop offset="0.008" stopColor="#9fb100" />
            <Stop offset="0.276" stopColor="#b0bb0e" />
            <Stop offset="0.717" stopColor="#c7c922" />
            <Stop offset="0.995" stopColor="#d0cf2a" />
          </LinearGradient>
        )}
      </Defs>
      <Path
        d="M97.728,31.042l-3.174-6.983C87.21,13.529,78.368,6.652,66.748,3.078,55.714-2.867,37.942.236,25.481,8.638,14.354,16.141,8.29,21.1,3.154,33.854-1.38,46.3-1.427,59.979,5.661,71.862S25.729,95.078,38.205,98.894c11.859,4.13,19.731,2.875,33.7-4.209,12.771-6.478,21.752-14.756,26.874-27.5C102.931,55.82,103.264,42.117,97.728,31.042Z"
        transform="matrix(0.391, 0.921, -0.921, 0.391, 93.197, 0)"
        fill={useGradient ? 'url(#linear-gradient)' : color}
      />
      <Path
        d="M57.2,4.527V9.242h1.048V4.527Zm11.979.385-6.183,6.177.786.786L69.957,5.7Zm-23.032.053-.791.791,6.236,6.233.789-.789ZM57.717,9.821a7.126,7.126,0,1,0,7.127,7.127,7.135,7.135,0,0,0-7.127-7.127Zm0,1.262a5.867,5.867,0,1,1-5.863,5.865A5.857,5.857,0,0,1,57.717,11.084ZM45.4,16.433v1.034h4.586V16.433Zm20.209.006v1.02h4.522V16.436Zm-1.769,5.8-.78.775,6.124,6.124.777-.777ZM51.787,22.3l-6.06,6.066.769.769,6.066-6.066ZM57.2,24.817l0,4.581h1.031V24.817ZM18.557,30.942v.008l0-.006L7.007,45.921V69.4H58.26V45.525h-.05l.022-.017-11.1-14.57Zm.933,1.2H46.544l10.2,13.386H29.993Zm-.928.761L29.1,46.339V68.2l-5.486,0V53.107H13.179V68.2H8.206V46.331Zm3.564.2.805.992,8.139,9.961H53.819L45.084,33.238Zm2.541,1.209,6.046.036,3.115,4.012H27.975Zm7.57.045,5.9.036,2.976,3.968H35.345Zm7.412.045,4.859.028,3.171,3.929H42.617Zm-10.7,5.158H34.76l2.552,3.291H31.639Zm7.326,0h5.743l2.469,3.291-5.654,0Zm7.239,0H48.65l2.658,3.291H45.986ZM20.809,41.494l-5.4.164v5h5.4Zm-1.2,1.24v2.728h-3V42.823ZM30.3,46.727h26.76V68.2H30.3ZM47.19,50.747v8.59h5.849V50.75Zm-5.871.059-5.851.078v8.39h5.851Zm7.072,1.142H51.84v6.188H48.391Zm-8.27.075v6.049H36.671V52.065ZM14.38,54.3h8.036V68.2H14.38Z"
        transform="translate(24.176 25.559)"
        fill="#fff"
        stroke="#fff"
        strokeWidth="0.6"
      />
    </Svg>
  );
};
