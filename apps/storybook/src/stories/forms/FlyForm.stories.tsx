import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { airports } from '@clean-rn/carbon/domain';
import { FlyForm, useFlyFormData } from '@clean-rn/ui-mobile';

import { WithKeyboardAwareScroll, WithStatus, ValidationStatus } from '../../wrappers';

const formattedAirports = airports.map((airport) => ({
  key: airport.IATA,
  value: airport.IATA + ' ' + airport.name,
}));

const FlyFormMeta: ComponentMeta<typeof FlyForm> = {
  title: 'Forms/FlyForm',
  component: FlyForm,
  argTypes: {
    onChangeField: { action: 'onChangeField' },
    onAddFlight: { action: 'onAddFlight' },
  },
  args: {
    airports: formattedAirports,
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default FlyFormMeta;

type FlyFormStory = ComponentStory<typeof FlyForm>;
export const Dynamic: FlyFormStory = (args) => {
  const scrollViewRef = useRef<null | KeyboardAwareScrollView>(null);

  const { flight, flights, handleChangeField, handleOnAddFlight, handleRemoveFlight } = useFlyFormData();
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
      <FlyForm
        {...args}
        flight={flight}
        flights={flights}
        onChangeField={handleChangeField}
        onAddFlight={handleOnAddFlight}
        onRemoveFlight={handleRemoveFlight}
        scrollViewRef={scrollViewRef}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
  },
});
