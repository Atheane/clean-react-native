import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { Colors, MultipleOptionsCheckBox, PrimaryButton, Slider } from '@clean-rn/ui-mobile';
import { FontNames, NEEDS_SMALL_TEXT } from '../constants';

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 40,
  },
  textTitle: {
    color: Colors.primary.darkGrey,
    fontSize: NEEDS_SMALL_TEXT ? 16 : 19,
    fontFamily: FontNames.Roboto_700Bold,
    fontWeight: '700',
  },
  textContent: {
    color: Colors.primary.grey,
    fontSize: NEEDS_SMALL_TEXT ? 15 : 18,
    fontFamily: FontNames.Roboto_400Regular,
    fontWeight: '400',
    textAlign: 'justify',
  },
});

const QuestionMarkIcon = () => (
  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
    <Icon type="feather" name="help-circle" color={'#000'} />
  </View>
);

export const eventsCardsContent = [
  {
    icon: () => <QuestionMarkIcon />,
    title: 'What is a key benefit of installing air quality / temperature sensors in residential buildings?​',
    Component: () => {
      const navigation = useNavigation();

      const handleOnSubmit = () => {
        navigation.goBack();
      };

      return (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>
              What is a key benefit of installing air quality/temperature sensors in residential buildings?
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <MultipleOptionsCheckBox
              optionsTitle={[
                'Decreasing energy consumption',
                'Reducing noise pollution​',
                'Increasing ventilation efficiency',
              ]}
              optionsValues={['A', 'B', 'C']}
              onChange={() => null}
              vertical={true}
            />
            <View style={styles.buttonContainer}>
              <PrimaryButton title="Submit" onPress={handleOnSubmit} />
            </View>
          </View>
        </View>
      );
    },
    uid: 'quiz_airquality_2',
  },
  {
    icon: () => <QuestionMarkIcon />,
    title: 'The current indoor temperature in your home is <VALUE> °C with a relative humidity of <VALUE> %.',
    Component: () => {
      const navigation = useNavigation();

      const handleOnSubmit = () => {
        navigation.goBack();
      };

      return (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>
              The current indoor temperature in your home is [VALUE] °C with a relative humidity of [VALUE]%.
              Why is it important for residents to be aware of such indoor conditions?
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <MultipleOptionsCheckBox
              optionsTitle={[
                'To prevent discomfort due to extreme temperatures',
                'To ensure proper functioning of electronic devices',
                'To adjust indoor activities accordingly for comfort and health',
              ]}
              optionsValues={['A', 'B', 'C']}
              onChange={() => null}
              vertical={true}
            />
            <View style={styles.buttonContainer}>
              <PrimaryButton title="Submit" onPress={handleOnSubmit} />
            </View>
          </View>
        </View>
      );
    },
    uid: 'quiz_temperature_3',
  },
  {
    icon: () => <QuestionMarkIcon />,
    title: 'What is NOT a key benefit of having a district heating network in a residential building?',
    Component: () => {
      const navigation = useNavigation();

      const handleOnSubmit = () => {
        navigation.goBack();
      };

      return (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>
              What is NOT a key benefit of having a district heating network in a residential building?
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <MultipleOptionsCheckBox
              optionsTitle={[
                'Lower maintenance costs',
                'Stable, continuous source of heat',
                'Heat loss in the distribution network',
              ]}
              optionsValues={['A', 'B', 'C']}
              onChange={() => null}
              vertical={true}
            />
            <View style={styles.buttonContainer}>
              <PrimaryButton title="Submit" onPress={handleOnSubmit} />
            </View>
          </View>
        </View>
      );
    },
    uid: 'quiz_heating_4',
  },
  {
    icon: () => <QuestionMarkIcon />,
    title: 'Time to test your energy consumption knowledge!',
    Component: () => {
      const navigation = useNavigation();

      const handleOnSubmit = () => {
        navigation.goBack();
      };

      const [value, setValue] = useState<number>(0);

      const handleOnChange = (value: number) => {
        setValue(value);
      };

      return (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>
              How much energy does your residential building consume in an average week?
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Slider
              label="Energy consumption"
              minValue={0}
              maxValue={1000}
              unit={' kWh'}
              value={value}
              onChange={handleOnChange}
            />
            <View style={styles.buttonContainer}>
              <PrimaryButton title="Submit" onPress={handleOnSubmit} />
            </View>
          </View>
        </View>
      );
    },
    uid: 'quiz_energyconsumption_5',
  },
  {
    icon: () => <QuestionMarkIcon />,
    title: 'Time to test your energy consumption knowledge!',
    Component: () => {
      const navigation = useNavigation();

      const handleOnSubmit = () => {
        navigation.goBack();
      };

      const [value, setValue] = useState<number>(0);

      const handleOnChange = (value: number) => {
        setValue(value);
      };

      return (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>
              How much energy does your residential building consume in an average day?
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Slider
              label="Energy consumption"
              minValue={0}
              maxValue={1000}
              unit={' kWh'}
              value={value}
              onChange={handleOnChange}
            />
            <View style={styles.buttonContainer}>
              <PrimaryButton title="Submit" onPress={handleOnSubmit} />
            </View>
          </View>
        </View>
      );
    },
    uid: 'quiz_energyconsumption_6',
  },
  {
    icon: () => <QuestionMarkIcon />,
    title: 'Test your energy consumption knowledge!',
    Component: () => {
      const navigation = useNavigation();

      const handleOnSubmit = () => {
        navigation.goBack();
      };

      return (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>
              What consumes more energy in your home - your heating or your laundry/dishwasher?
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <MultipleOptionsCheckBox
              optionsTitle={['your heating', 'your laundry/dishwasher']}
              optionsValues={['A', 'B']}
              onChange={() => null}
              vertical={true}
            />
            <View style={styles.buttonContainer}>
              <PrimaryButton title="Submit" onPress={handleOnSubmit} />
            </View>
          </View>
        </View>
      );
    },
    uid: 'quiz_energyconsumption_7',
  },
  {
    icon: () => <QuestionMarkIcon />,
    title: 'Are you ready for a quiz?',
    Component: () => {
      const navigation = useNavigation();

      const handleOnSubmit = () => {
        navigation.goBack();
      };

      const [value, setValue] = useState<number>(0);

      const handleOnChange = (value: number) => {
        setValue(value);
      };

      return (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>
              Approximately what percentage of the energy consumption of a dishwasher is used to heat the
              water?
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Slider
              label="Share of energy to heat water"
              minValue={0}
              maxValue={100}
              unit={' %'}
              value={value}
              onChange={handleOnChange}
            />
            <View style={styles.buttonContainer}>
              <PrimaryButton title="Submit" onPress={handleOnSubmit} />
            </View>
          </View>
        </View>
      );
    },
    uid: 'quiz_energyconsumption_8',
  },
];
