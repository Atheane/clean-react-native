import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinkButton } from '../link-button';
import { LinkButtonColors } from '../../types';
import { Colors, FontNames } from '../../constants';

type IProps = {
  text: string;
  icon: React.FC<SvgProps>;
  onPress: () => void;
};

export const LongCard = (props: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
      {props.icon && (
        <View style={styles.iconContainer}>
          <LinkButton
            pressed={false}
            onPress={props.onPress}
            iconOne={props.icon}
            colorOption={LinkButtonColors.BLUE}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: Colors.background.white,
    width: Dimensions.get('window').width * 0.85,
    height: 85,
    borderRadius: 20,
    shadowColor: Colors.shadow.bold,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: { marginLeft: 16 },
  text: {
    fontSize: 16,
    fontFamily: FontNames.Roboto_400Regular,
    color: Colors.text.lightBlue,
    lineHeight: 21,
    paddingLeft: 16,
  },
  iconContainer: { position: 'absolute', right: 24 },
});
