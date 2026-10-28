import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@rneui/themed';

type IProps = {
  text: string;
};

export const NoCO2 = (props: IProps) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, theme.container.centeredItem]}>
      <Text style={theme.text.darkBlue}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.8,
  },
});
