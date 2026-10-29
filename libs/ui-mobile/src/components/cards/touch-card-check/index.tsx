import { FC } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';
import { FullChecked } from '../../../assets';
import { Colors } from '../../../constants';

type IProps = {
  icon: React.FC<SvgProps>;
  text: string;
  onPress: () => void;
  checked?: boolean;
};

export const TouchCardCheck: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={props.onPress} style={[theme.shadow.card, theme.container.card.kpi]}>
      {props.checked && (
        <View style={styles.checkContainer}>
          <FullChecked />
        </View>
      )}
      <View style={[styles.container, props.checked ? { marginTop: -50 } : { marginTop: 20 }]}>
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
  checkContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
