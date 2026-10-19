import { View, StyleSheet } from 'react-native';

type IProps = {
  background: () => JSX.Element;
  children: React.ReactNode;
};

export const ViewBackground = (props: IProps) => {
  return (
    <View>
      <View style={styles.ground}>
        <props.background />
      </View>

      <View>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  ground: {
    zIndex: 0,
  },
});
