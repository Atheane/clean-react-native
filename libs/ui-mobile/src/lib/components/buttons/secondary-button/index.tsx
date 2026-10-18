import { FC } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Button } from '@rneui/themed';

import { Colors, FontNames } from '../../../constants';
import { firstLetterCapitalize } from '../../../utils';

type IProps = {
  title: string;
  large?: boolean;
  uppercase?: boolean;
  iconOne?: React.FC<SvgProps>;
  loading?: boolean;
  onPress: () => void;
  disabled?: boolean;
};

export const SecondaryButton: FC<IProps> = (props: IProps) => {
  return (
    <View style={props.large ? styles.containerLarge : styles.container}>
      <Button
        style={styles.buttonContainer}
        buttonStyle={styles.button}
        loading={props?.loading ?? false}
        onPress={props.onPress}
        disabled={props.disabled}
        raised
      >
        <View style={styles.contentContainer}>
          {props.iconOne && (
            <View style={styles.iconContainer}>
              <props.iconOne />
            </View>
          )}
          <View>
            <Text style={[styles.content, { textTransform: props.uppercase ? 'uppercase' : 'none' }]}>
              {firstLetterCapitalize(props.title)}
            </Text>
          </View>
        </View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  containerLarge: {
    width: Dimensions.get('window').width * 0.8,
    height: 55,
    radius: 50,
  },
  buttonContainer: {
    shadowColor: Colors.bank.shadow, // iOS
    shadowOffset: { width: 5, height: 15 }, // iOS
    shadowOpacity: 0.34, // iOS
    shadowRadius: 20, // iOS
    elevation: 1, // android,
  },
  button: {
    paddingTop: 12,
    paddingRight: 24,
    paddingBottom: 11,
    paddingLeft: 26,
    backgroundColor: Colors.bank.primary.white,
  },
  contentContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  content: {
    lineHeight: 29,
    fontSize: 16,
    color: Colors.bank.primary.lightGreen,
    fontFamily: FontNames.Roboto_700Bold,
  },
  iconContainer: {
    marginRight: 15,
  },
});
