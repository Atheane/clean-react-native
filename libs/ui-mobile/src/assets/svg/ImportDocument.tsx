import Svg, { Defs, LinearGradient, Stop, G, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const ImportDocument = ({
  width = 27,
  height = 30,
  startColor = '#cfce29',
  endColor = '#a1b201',
  color,
  style,
}: IProps) => {
  const useGradient = !color;
  return (
    <Svg width={width} height={height} viewBox="0 0 27 30" style={style}>
      <Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>
      <G id="icon_uplaod" transform="translate(0 0)">
        <Path
          id="Tracé_7606"
          data-name="Tracé 7606"
          d="M46.542,62.388a.645.645,0,0,0-.975-.095l-.754.723a.668.668,0,0,1-.975-.063l-2.387-3.237a.645.645,0,0,0-1.068.032l-4.117,6.566A.649.649,0,0,0,36.8,67.32h12a.654.654,0,0,0,.534-1.037Z"
          transform="translate(-26.966 -41.523)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7607"
          data-name="Tracé 7607"
          d="M69.229,53.263a1.666,1.666,0,0,1-3.331,0,1.666,1.666,0,0,1,3.331,0"
          transform="translate(-47.359 -36.139)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7608"
          data-name="Tracé 7608"
          d="M33.7,13.774,27.386,7.426a.972.972,0,0,0-.691-.282L20.85,7.112a7.2,7.2,0,1,0-9.271,9.237V29.986a2.253,2.253,0,0,0,2.262,2.262H31.719a2.253,2.253,0,0,0,2.262-2.262l0-15.552a.853.853,0,0,0-.284-.659Zm-6.033-3.3,3.017,3.017H27.668ZM8.847,9.626A5.279,5.279,0,1,1,14.126,14.9,5.291,5.291,0,0,1,8.847,9.626ZM31.721,30.333H13.843a.315.315,0,0,1-.314-.314v-13.2a3.552,3.552,0,0,0,.6.032A7.214,7.214,0,0,0,21.32,9.659a3.367,3.367,0,0,0-.032-.566h4.431v5.342a.979.979,0,0,0,.975.975h5.342V29.988a.344.344,0,0,1-.314.345Z"
          transform="translate(-6.898 -2.399)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
        <Path
          id="Tracé_7609"
          data-name="Tracé 7609"
          d="M24.7,20.378v-2.86l.22.189a.919.919,0,0,0,.66.252.974.974,0,0,0,.66-1.7l-1.853-1.728a.968.968,0,0,0-1.319,0l-1.823,1.728a.978.978,0,1,0,1.35,1.414l.22-.189v2.86a.979.979,0,0,0,.975.975.9.9,0,0,0,.911-.944Z"
          transform="translate(-16.535 -10.544)"
          fill={useGradient ? 'url(#linear-gradient)' : color}
        />
      </G>
    </Svg>
  );
};
