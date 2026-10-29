import { View, Text, StyleSheet, ImageSourcePropType, Image } from 'react-native';
import { useTheme } from '@rneui/themed';
import { SvgProps } from 'react-native-svg';

import { Colors } from '../../../constants';

type IProps = {
  title?: string;
  img?: ImageSourcePropType;
  imgWidth?: number;
  imgHeight?: number;
  icon?: React.FC<SvgProps>;
  text: string;
};
export const ModalContent = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {props.title && (
        <View style={styles.titleContainer}>
          <Text style={theme.text.title}>{props.title}</Text>
        </View>
      )}
      {props.text && (
        <View style={styles.contentContainer}>
          {(props.img || props.icon) && (
            <View style={styles.imgContainer}>
              {props.img && (
                <Image
                  source={props.img}
                  style={{ ...styles.image, width: props.imgWidth, height: props.imgHeight }}
                />
              )}
              {props.icon && <props.icon style={styles.icon} />}
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={theme.text.content}>{props.text}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    height: '100%',
  },
  titleContainer: {
    marginHorizontal: 12,
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  contentContainer: {
    marginHorizontal: 12,
  },
  textContainer: {
    marginHorizontal: 12,
    marginVertical: 48,
  },
});
