import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path, G } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const ExportPdf = ({
  width = 24,
  height = 24,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="np_export-pdf_2021663_000000" transform="translate(-5.7 -5.602)">
        <Path
          id="Tracé_7365"
          d="M26.454,19.772a1.028,1.028,0,0,0-1.013,1.013V32.832a1.823,1.823,0,0,1-1.808,1.808H9.533a1.823,1.823,0,0,1-1.808-1.808v-14.1a1.823,1.823,0,0,1,1.808-1.808h11.8a1.013,1.013,0,1,0,0-2.026H9.533A3.845,3.845,0,0,0,5.7,18.731v14.1a3.845,3.845,0,0,0,3.833,3.833h14.1a3.845,3.845,0,0,0,3.833-3.833V20.785a1.01,1.01,0,0,0-1.013-1.013Z"
          transform="translate(0 -6.751)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7366"
          d="M52.035,5.6a1.013,1.013,0,0,0,0,2.026h3.45l-9.446,9.446a1.026,1.026,0,0,0,0,1.424.992.992,0,0,0,1.425,0l9.555-9.555v3.45a1.013,1.013,0,0,0,2.026,0V5.6Z"
          transform="translate(-29.086 0)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7367"
          d="M18.6,58.8H20.71a3.8,3.8,0,0,1,.821.082,1.709,1.709,0,0,1,.685.274,1.425,1.425,0,0,1,.465.52,2.131,2.131,0,0,1,0,1.643,1.429,1.429,0,0,1-.439.548,1.757,1.757,0,0,1-.657.274,3.8,3.8,0,0,1-.821.082h-.9v2.19H18.629V58.8Zm1.232,2.382h.821a1.311,1.311,0,0,0,.328-.028.839.839,0,0,0,.274-.109.5.5,0,0,0,.191-.219.585.585,0,0,0,.082-.328.557.557,0,0,0-.109-.356.548.548,0,0,0-.246-.191.76.76,0,0,0-.356-.082c-.137,0-.246-.028-.356-.028h-.63Z"
          transform="translate(-9.369 -38.633)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7368"
          d="M36.9,58.8H38.76a4.993,4.993,0,0,1,1.287.165,3.175,3.175,0,0,1,1.067.493,2.242,2.242,0,0,1,.712.876,2.748,2.748,0,0,1,.274,1.314,2.79,2.79,0,0,1-.246,1.2,2.707,2.707,0,0,1-.685.876,3.307,3.307,0,0,1-1.013.548,4.442,4.442,0,0,1-1.2.191H36.927V58.8Zm1.232,4.49h.657a3.724,3.724,0,0,0,.794-.082,1.5,1.5,0,0,0,.63-.3,1.269,1.269,0,0,0,.439-.548,1.835,1.835,0,0,0,.165-.821,1.437,1.437,0,0,0-.165-.712,1.465,1.465,0,0,0-.411-.493,1.929,1.929,0,0,0-.63-.3,3.164,3.164,0,0,0-.738-.08h-.739Z"
          transform="translate(-22.656 -38.633)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7369"
          d="M59.2,58.8h3.779v1.15H60.431V61.1h2.355v1.15H60.431v2.19H59.2Z"
          transform="translate(-38.851 -38.633)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
