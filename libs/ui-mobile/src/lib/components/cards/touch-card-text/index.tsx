import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@rneui/themed';

type IProps = {
  text: string;
  onPress: () => void;
};

export const TouchCardText: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={props.onPress} style={[theme.bank.shadow.card, theme.bank.container.card.kpi]}>
      <Text style={[styles.textContainer, theme.bank.text.darkBlue]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 16,
    marginTop: 8,
    textAlign: 'left',
  },
});
