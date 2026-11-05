import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PrimaryButton, RightChevron, Colors, BottomTabs, LoaderSplashScreen } from '@clean-rn/ui-mobile';
import { Quiz } from '@clean-rn/energy/domain';
import { fetchRefresh } from '../../../auth/application/commands';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { Introduction, Question, Feedback } from './quiz';
type QuizStep = 'intro' | 'question' | 'feedback';

export const ModalQuiz = () => {
  const { energy } = useSelector((state: IRootState) => state.energy);
  const [currentStep, setCurrentStep] = useState<QuizStep>('intro');
  const [currentIntroPage, setCurrentIntroPage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(1);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  useEffect(() => {
    if (energy?.properties.currentQuiz?.id) {
      setIsLoading(false);
      setQuizData(energy.properties.currentQuiz);
    }
  }, [energy?.properties.currentQuiz]);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchRefresh());
  }, [dispatch]);

  const handleNext = () => {
    if (currentStep === 'intro') {
      if (currentIntroPage < 2) {
        setCurrentIntroPage((prev) => prev + 1);
      } else {
        setCurrentStep('question');
      }
    } else if (currentStep === 'question') {
      setCurrentStep('feedback');
    }
  };

  const handleAnswerSelected = (answer: string) => {
    console.log(answer);
    setSelectedAnswer(answer);
  };

  const renderIntroductionContent = () => {
    return (
      <BottomTabs
        tabsCount={3}
        colorInactive={Colors.primary.lightGrey}
        contents={
          quizData?.properties.intros?.map((content: string, index: number) => (
            <View style={styles.introContainer} key={index}>
              <Introduction description={content} />
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  onPress={handleNext}
                  title={t('screens.energy.quiz.button-next')}
                  long
                  iconRight={() => <RightChevron color={Colors.primary.white} width={16} height={16} />}
                />
              </View>
            </View>
          )) ?? []
        }
        color={Colors.secondary.blue}
        activeTab={currentIntroPage}
        onChangeTab={(index: number) => setCurrentIntroPage(index)}
      />
    );
  };

  const renderQuestionContent = () => {
    return (
      <View style={styles.questionContainer}>
        <Question
          question={quizData?.properties?.question as string}
          choices={quizData?.properties?.choices?.map((choice: string) => choice) as string[]}
          onAnswerSelected={handleAnswerSelected}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={handleNext} title={t('screens.energy.quiz.button-question')} long />
        </View>
      </View>
    );
  };

  const renderFeedbackContainer = () => {
    return (
      <View style={styles.feedbackContainer}>
        <Feedback isCorrect={true} />
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={handleNext}
            title={
              isCorrect
                ? t('screens.energy.quiz.button-feeback-true')
                : t('screens.energy.quiz.button-feeback-false')
            }
            long
          />
        </View>
      </View>
    );
  };

  return isLoading ? (
    <LoaderSplashScreen />
  ) : (
    <View style={styles.container}>
      {currentStep === 'intro' && renderIntroductionContent()}
      {currentStep === 'question' && renderQuestionContent()}
      {currentStep === 'feedback' && renderFeedbackContainer()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    alignItems: 'center',
  },
  introContainer: {
    flex: 2,
    backgroundColor: Colors.primary.white,
    alignItems: 'center',
  },
  questionContainer: {
    flex: 2,
    backgroundColor: Colors.primary.white,
    alignItems: 'center',
  },
  feedbackContainer: {
    flex: 2,
    backgroundColor: Colors.primary.white,
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: 40,
  },
});
