import { FC } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';
import { Question } from '../../../assets/svg';
import { Colors } from '../../../constants';

type IProps = {
  title?: string;
  data: { kpi?: string; text?: string };
  icon?: React.FC<SvgProps>;
  img?: ImageSourcePropType;
  help?: boolean;
  handleHelp?: () => void;
};

const KPI_CARD_RATIO = 112 / 174;

export const TileKpi: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <View style={[theme.container.tile.kpi, Platform.OS === 'web' ? styles.webShadow : theme.shadow.tile]}>
      <View
        style={[
          styles.rowContainer,
          Platform.OS !== 'web' && { justifyContent: 'space-between', alignItems: 'flex-start' },
        ]}
      >
        {props.title && (
          <View style={Platform.OS !== 'web' && { width: '70%' }}>
            <Text
              style={[
                theme.text.boldGrey,
                Platform.OS !== 'web' && { lineHeight: 20 },
                { fontSize: Platform.OS === 'web' ? 24 : 14, flexWrap: 'wrap' },
              ]}
            >
              {props.title}
            </Text>
          </View>
        )}
        {Platform.OS !== 'web' && (
          <TouchableOpacity onPress={props.handleHelp}>
            <Question width={20} height={20} color={Colors.primary.lightGrey} />
          </TouchableOpacity>
        )}
      </View>
      {Platform.OS === 'web' && (
        <View style={[styles.helpContainer]}>
          {props.help && (
            <TouchableOpacity onPress={props.handleHelp}>
              <Question width={30} height={30} color={Colors.primary.grey} />
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={[styles.rowContainer, { flex: 4 }]}>
        {props.data && props.data.kpi && (
          <Text style={[theme.text.boldDarkBlue, { fontSize: 36 }]}>{props.data.kpi}</Text>
        )}
        {props.data && props.data.text && <Text style={theme.text.boldDarkBlue}>{props.data.text}</Text>}
        {props.icon && <props.icon />}
        {props.img && <Image style={styles.img} source={props.img} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: { width: 64, height: 64 },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  webShadow: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 500,
    minHeight: Dimensions.get('window').width * 0.9 * KPI_CARD_RATIO * 0.5,
  },
  helpContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
