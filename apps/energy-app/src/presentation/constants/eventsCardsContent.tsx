import { Icon } from '@rneui/themed';
import { View } from 'react-native';

const QuestionMarkIcon = () => (
  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
    <Icon type="feather" name="help-circle" color={'#000'} />
  </View>
);

export const eventsCardsContent = [
  {
    icon: QuestionMarkIcon,
    title: 'Complete today’s quiz to earn <NUMBER> €O2 coins.',
    text: 'Various questions will become available after 4 hours. And remember, you can answer the same question many times until you get the correct answer! The point is to learn something new after all.',
    uid: 'quiz_general_1',
  },
  {
    icon: QuestionMarkIcon,
    title: 'Test your air quality knowledge and earn some €O2 coins!',
    text: "Here's today's quiz: What is a key benefit of installing air quality/temperature sensors in residential buildings?​\nA) Decreasing energy consumption\n​B) Reducing noise pollution\n​C) Increasing ventilation efficiency",
    uid: 'quiz_airquality_2',
  },
  {
    icon: QuestionMarkIcon,
    title: 'Time to test your temperature knowledge and earn some €O2 coins!',
    text: "Here's today's quiz: The current indoor temperature in your home is <VALUE> °C with a relative humidity of <VALUE> %. Why is it important for residents to be aware of such indoor conditions?\nA) To prevent discomfort due to extreme temperatures\n​B) To ensure proper functioning of electronic devices​\nC) To adjust indoor activities accordingly for comfort and health",
    uid: 'quiz_temperature_3',
  },
  {
    icon: QuestionMarkIcon,
    title: 'Test your heating knowledge and earn some €O2 coins!',
    text: "Here's today's quiz: What is NOT a key benefit of having a district heating network in a residential building?\nA) Lower maintenance costs\nB) Stable, continuous source of heat\nC) Heat loss in the distribution network",
    uid: 'quiz_heating_4',
  },
  {
    icon: QuestionMarkIcon,
    title: 'Time to test your energy consumption knowledge and earn some €O2 coins!',
    text: "Here's today's quiz: How much energy does your residential building consume in an average week?",
    uid: 'quiz_energyconsumption_5',
  },
  {
    icon: QuestionMarkIcon,
    title: 'Test your energy consumption knowledge and earn some €O2 coins!',
    text: "Here's today's quiz: How much energy does your residential building consume in an average day?",
    uid: 'quiz_energyconsumption_6',
  },
  {
    icon: QuestionMarkIcon,
    title: 'Test your energy consumption knowledge and earn some €O2 coins!',
    text: "Here's today's quiz: What consumes more energy in your home - your heating or your laundry/dishwasher?",
    uid: 'quiz_energyconsumption_7',
  },
  {
    icon: QuestionMarkIcon,
    title: 'Are you ready for a quiz?',
    text: 'Approximately what percentage of the energy consumption of a dishwasher is used to heat the water?',
    uid: 'artquiz_energyconsumption_8',
  },
  {
    icon: QuestionMarkIcon,
    title: 'Nice work!',
    text: "Hopefully you've learned a thing or two about energy consumption while earning  <NUMBER OF COINS> €O2 coins. Keep an eye out for future quizzes for more chances to test your knowledge and earn €O2 coins.",
    uid: 'quiz_general_9',
  },
];
