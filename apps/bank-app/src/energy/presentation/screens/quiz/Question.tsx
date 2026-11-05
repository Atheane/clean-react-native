import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors, SunnyHouse, FontNames, MultipleOptionsCheckBox } from '@clean-rn/ui-mobile';
import { useTheme } from '@rneui/themed';

type IProps = {
  question: string;
  choices: string[];
  onAnswerSelected: (answer: string) => void;
};

export const Question = ({ question, choices, onAnswerSelected }: IProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.sunnyHouseContainer}>
        <SunnyHouse />
      </View>
      <View style={styles.titleContainer}>
        <Text style={theme.text.boldDarkBlue}>{t('screens.energy.quiz.quiz')}</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={theme.text.grey}>{question}</Text>
      </View>
      <View style={styles.choicesContainer}>
        <MultipleOptionsCheckBox
          optionsTitle={choices}
          optionsValues={choices}
          onChange={onAnswerSelected}
          vertical={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary.white,
    width: '80%',
    marginHorizontal: Dimensions.get('window').width * 0.1,
  },
  sunnyHouseContainer: {
    marginTop: 40,
  },
  titleContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.secondary.black,
    fontFamily: FontNames.MartelSans_900Black,
    textAlign: 'center',
  },
  questionContainer: {
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.primary.darkGrey,
    fontFamily: FontNames.MartelSans_400Regular,
    textAlign: 'left',
    marginTop: 36,
  },
  choicesContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
});
