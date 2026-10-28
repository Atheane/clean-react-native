import { useState } from 'react';
import { Pressable } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import DateTimePickerNative, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { Lock } from '../../../assets';
import { Colors } from '../../../constants';

import { TextInput } from '../../inputs/text-input';

type Props = {
  value: Dayjs;
  label: string;
  format: 'DD/MM/YYYY';
  placeholder: string;
  onChange: (data: Dayjs) => void;
  defaultValue?: Dayjs;
  onSubmitEditing: () => void;
};

export const DateTimePicker = (props: Props) => {
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const [date, setDate] = useState<Dayjs>(
    props.defaultValue ? dayjs(props.defaultValue) : dayjs('1980-01-01'),
  );
  const handleOnFocus = () => {
    setContainerIsFocused(true);
  };

  const handleOnPress = () => {
    setContainerIsFocused(true);
  };

  const handleChange = (event: DateTimePickerEvent) => {
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
          onChange={handleChange}
          mode="date"
          display={'spinner'}
        />
      )}

      <TextInput
        label={props.label}
        labelColor={Colors.primary.grey}
        IconLeft={() => <Lock style={{ color: Colors.primary.lightGreen }} />}
        value={date.format(props.format)}
        placeholder={props.placeholder}
        onFocus={handleOnFocus}
        onSubmitEditing={props.onSubmitEditing}
      />
    </Pressable>
  );
};
