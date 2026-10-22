import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useTheme } from '@rneui/themed';
import { BackgroundCardArrow, BackgroundCardGrey } from '../../../assets';
import { Dropdown } from '../../dropdowns/dropdown';

type IData = {
  key: string;
  value: string;
};

type IProps = {
  image: ImageSourcePropType;
  text: string;
  data?: IData[];
  onSelect?: (item: IData) => void;
  arrow: boolean;
};

export const TransferCard = (props: IProps) => {
  const { theme } = useTheme();
  return (
    <View>
      <View style={styles.backgroundContainer}>
        {props.arrow && <BackgroundCardArrow />}
        {!props.arrow && <BackgroundCardGrey />}
        <View style={[styles.textContainer, { width: props.arrow ? 80 : 150 }]}>
          <Text style={[theme.bank.text.boldDarkBlue, { fontSize: 12, lineHeight: 19 }]}>
            {props.arrow ? props.text.slice(0, 12) : props.text}
          </Text>
        </View>
        {props.arrow && (
          <View style={styles.dropdownContainer}>
            <Dropdown
              data={props.data ?? []}
              short
              shortWidth={174}
              defaultValue={props.data && props.data.length > 0 ? props.data[0].value : undefined}
              multiline
              onSelect={props?.onSelect}
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
  backgroundContainer: {
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    top: 20,
    left: 70,
    height: 40,
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
