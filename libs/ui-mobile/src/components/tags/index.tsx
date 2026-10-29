import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants';

type IProps = {
  color: string;
  text: string;
};
export const Tag = (props: IProps) => {
  return (
    <View style={{ ...styles.container, backgroundColor: props.color }}>
      <Text style={styles.text}>{props.text ? props.text.toLocaleUpperCase() : props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 15,
    width: 100,
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 10,
    color: Colors.primary.grey,
  },
});
