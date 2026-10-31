import Svg, { Circle, G, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const TransactionSubscription = ({ width = 28, height = 28, color = '#9b6010', style }: IProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" style={style}>
      <Circle cx={14} cy={14} r={14} fill={color} />

      <G id="np_subscription_4041357_000000" transform="translate(6.601 6)">
        <Path
          id="Tracé_7642"
          data-name="Tracé 7642"
          d="M14.348,55.3h-.529a.42.42,0,1,1,0-.841h.529a.42.42,0,1,1,0,.841Z"
          transform="translate(-11.202 -45.529)"
          fill="#fff"
        />
        <Path
          id="Tracé_7643"
          data-name="Tracé 7643"
          d="M48.215,42.337h-.529a.42.42,0,1,1,0-.841h.529a.42.42,0,1,1,0,.841Z"
          transform="translate(-39.515 -34.691)"
          fill="#fff"
        />
        <Path
          id="Tracé_7644"
          data-name="Tracé 7644"
          d="M65.148,42.337h-.529a.42.42,0,1,1,0-.841h.529a.42.42,0,1,1,0,.841Z"
          transform="translate(-53.671 -34.691)"
          fill="#fff"
        />
        <Path
          id="Tracé_7645"
          data-name="Tracé 7645"
          d="M31.281,42.337h-.529a.42.42,0,1,1,0-.841h.529a.42.42,0,1,1,0,.841Z"
          transform="translate(-25.358 -34.691)"
          fill="#fff"
        />
        <Path
          id="Tracé_7646"
          data-name="Tracé 7646"
          d="M31.281,68.271h-.529a.42.42,0,1,1,0-.841h.529a.42.42,0,1,1,0,.841Z"
          transform="translate(-25.358 -56.371)"
          fill="#fff"
        />
        <Path
          id="Tracé_7647"
          data-name="Tracé 7647"
          d="M14.348,68.271h-.529a.42.42,0,0,1,0-.841h.529a.42.42,0,0,1,0,.841Z"
          transform="translate(-11.202 -56.371)"
          fill="#fff"
        />
        <Path
          id="Tracé_7648"
          data-name="Tracé 7648"
          d="M31.605,53.194a.709.709,0,0,1-1.418,0,.709.709,0,1,1,1.418,0"
          transform="translate(-25.237 -43.877)"
          fill="#fff"
        />
        <Path
          id="Tracé_7649"
          data-name="Tracé 7649"
          d="M51.249,46.895a4.34,4.34,0,0,0-3.111,1.311.415.415,0,0,0-.233-.07h-.529a.42.42,0,0,0,0,.841h.16a4.354,4.354,0,1,0,3.713-2.082Zm0,7.868a3.514,3.514,0,1,1,3.513-3.513,3.518,3.518,0,0,1-3.513,3.513Z"
          transform="translate(-39.204 -39.204)"
          fill="#fff"
        />
        <Path
          id="Tracé_7650"
          data-name="Tracé 7650"
          d="M13.185,1.135h-1.11V.42a.42.42,0,1,0-.841,0v.715H9V.42a.42.42,0,1,0-.841,0v.715H5.933V.42a.42.42,0,0,0-.841,0v.715H2.86V.42a.42.42,0,0,0-.841,0v.715H.91A.912.912,0,0,0,0,2.046V13.185A.912.912,0,0,0,.91,14.1h5.45a.42.42,0,1,0,0-.841H.91a.07.07,0,0,1-.07-.07V5.017H13.254v.994a.42.42,0,1,0,.841,0V2.047a.912.912,0,0,0-.911-.912Z"
          transform="translate(0 0)"
          fill="#fff"
        />
        <Path
          id="Tracé_7651"
          data-name="Tracé 7651"
          d="M83.556,73.757a.491.491,0,0,1-.981,0,.491.491,0,0,1,.981,0"
          transform="translate(-69.033 -61.251)"
          fill="#fff"
        />
        <Path
          id="Tracé_7652"
          data-name="Tracé 7652"
          d="M62.652,56.556l-.4-.852a.42.42,0,0,0-.784.3,2.332,2.332,0,0,0-.276-.017A2.475,2.475,0,0,0,58.769,58.5a.42.42,0,1,0,.841,0,1.634,1.634,0,0,1,1.58-1.677.423.423,0,0,0,.527.6l.715-.3a.429.429,0,0,0,.219-.567Z"
          transform="translate(-49.132 -46.366)"
          fill="#fff"
        />
        <Path
          id="Tracé_7653"
          data-name="Tracé 7653"
          d="M65.264,79.688a.421.421,0,0,0-.589-.079,1.513,1.513,0,0,1-.923.315,1.478,1.478,0,0,1-.477-.079.42.42,0,0,0-.312-.759l-.783.136a.426.426,0,0,0-.333.527l.226.811a.423.423,0,0,0,.8.032,2.343,2.343,0,0,0,2.313-.314.42.42,0,0,0,.079-.589Z"
          transform="translate(-51.691 -66.11)"
          fill="#fff"
        />
      </G>
    </Svg>
  );
};
