import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';
import { BackgroundCardArrow, BackgroundCardGrey } from '../../../assets';
import { Dropdown } from '../../dropdowns/dropdown';

type IData = {
  key: string;
  value: string;
};

type IProps = {
  icon: React.FC<SvgProps>;
  text: string;
  uniqueAccount?: boolean;
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
        <View style={[styles.textContainer, { width: props.arrow ? 150 : 150 }]}>
          <Text style={[theme.text.boldDarkBlue, { fontSize: 12, lineHeight: 19 }]}>
            {props.arrow ? props.text.slice(0, 19) : props.text}
          </Text>
        </View>
        {props.arrow && !props.uniqueAccount && (
          <View style={styles.dropdownContainer}>
            <Dropdown
              data={props.data ?? []}
              short
              shortWidth={120}
              defaultValue={props.data && props.data.length > 0 ? props.data[0].value : undefined}
              multiline
              onSelect={props?.onSelect as (item: IData) => void}
              placeholder=""
            />
          </View>
        )}
        {props.arrow && props.uniqueAccount && props.data && props.data.length > 0 && (
          <View style={[styles.uniqueAccountContainer, theme.container.input, { width: 120 }]}>
            <Text style={theme.text.input}>{props.data[0].value}</Text>
          </View>
        )}
        <View style={styles.iconStyle}>
          <props.icon />
        </View>
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
    left: 60,
    height: 40,
    justifyContent: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  uniqueAccountContainer: {
    position: 'absolute',
    top: 2,
    right: 17,
    padding: 10,
  },
  iconStyle: {
    position: 'absolute',
    // Adjust top, left, right, bottom as needed
    top: 20,
    left: 16,
    width: 40,
    height: 40,
  },
});
