import { FC } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';
import { StepDone } from '../../../assets';

type IProps = {
  icon: React.FC<SvgProps>;
  text: string;
  onPress: () => void;
  checked?: boolean;
};

const KPI_CARD_RATIO = 112 / 174;

export const TouchCardCheck: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[theme.container.card.kpi, Platform.OS === 'web' ? styles.webContainer : theme.shadow.card]}
    >
      {props.checked && (
        <View style={styles.checkContainer}>
          <StepDone width={26} height={26} />
        </View>
      )}
      <View style={styles.container}>
        <props.icon />
        <Text style={[theme.text.boldDarkBlue, { marginTop: 8 }]}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webContainer: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 500,
    minHeight: Dimensions.get('window').width * 0.9 * KPI_CARD_RATIO * 0.5,
  },
  checkContainer: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 10,
    right: Platform.OS === 'web' ? 20 : 10,
  },
});
