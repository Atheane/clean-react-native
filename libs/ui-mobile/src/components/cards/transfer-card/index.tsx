import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useTheme } from '@rneui/themed';
import { BackgroundCardArrow, BackgroundCardGrey } from '../../../assets';
import { Dropdown } from '../../dropdowns/dropdown';

type IData = {
  key: any;
  value: string;
};

type IProps = {
  image: ImageSourcePropType;
  text: string;
  data: IData[];
  onSelect: () => void;
  arrow: boolean;
};

export const TransferCard = (props: IProps) => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        {props.arrow && <BackgroundCardArrow />}
        {!props.arrow && <BackgroundCardGrey />}
        <View style={[styles.textContainer, { width: props.arrow ? 80 : 150 }]}>
          <Text style={[theme.bank.text.boldDarkBlue, { fontSize: 12 }]}>
            {props.arrow ? props.text.slice(0, 12) : props.text}
          </Text>
        </View>
        {props.arrow && (
          <View style={styles.dropdownContainer}>
            <Dropdown
              data={props.data}
              short
              shortWidth={174}
              defaultValue={props.data[0].value}
              onSelect={props.onSelect}
              placeholder=""
            />
          </View>
        )}
        <Image source={props.image} style={styles.imageStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    top: 16,
    left: 62,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  imageStyle: {
    position: 'absolute',
    // Adjust top, left, right, bottom as needed
    top: 20,
    left: 16,
    width: 40,
    height: 40,
  },
});
