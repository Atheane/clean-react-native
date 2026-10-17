import { useState } from 'react';
import { Pressable } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import DateTimePickerNative, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useTheme } from '@rneui/themed';

import { Lock } from '../../assets';
import { Colors } from '../../constants';

import { TextInput } from '../text-input';

type Props = {
  value: Dayjs;
  label: string;
  format: 'DD/MM/YYYY';
  placeholder: string;
  onChange: (data: Dayjs) => void;
};

export const DateTimePicker = (props: Props) => {
  const { theme } = useTheme();

  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const [date, setDate] = useState<Dayjs>(dayjs('1980-01-01'));
  const handleOnFocus = () => {
    setContainerIsFocused(true);
  };

  const handleOnPress = () => {
    setContainerIsFocused(true);
  };

  const handleOnchange = (event: DateTimePickerEvent) => {
    const {
      nativeEvent: { timestamp },
    } = event;
    setContainerIsFocused(false);
    const date = dayjs(timestamp);
    setDate(date);
    props.onChange(date);
  };

  return (
    <Pressable onPress={handleOnPress}>
      {containerIsFocused && (
        <DateTimePickerNative
          value={dayjs(props.value).toDate()}
          onChange={handleOnchange}
          mode="date"
          display={'spinner'}
        />
      )}
      <TextInput
        label={props.label}
        labelColor={Colors.text.lightGrey}
        icon={() => <Lock fill={theme.linearGradient.start} />}
        value={date.format(props.format)}
        placeholder={props.placeholder}
        onFocus={handleOnFocus}
      />
    </Pressable>
  );
};
