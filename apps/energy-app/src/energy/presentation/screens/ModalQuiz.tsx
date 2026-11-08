import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton, RightChevron, Colors, BottomTabs, LoaderSplashScreen } from '@clean-rn/ui-mobile';
import { Quiz, Energy } from '@clean-rn/energy/domain';
import { fetchRefresh } from '../../../auth/application/commands';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { checkAnswer, computeRewards } from '../../../energy/application/commands';
import { IEnergyStackPages } from '../../../shared/presentation/types';

import { Introduction, Question, Feedback } from './quiz';

type QuizStep = 'intro' | 'question' | 'feedback';

export const ModalQuiz = () => {
  const { energy } = useSelector((state: IRootState) => state.energy);
  const [currentStep, setCurrentStep] = useState<QuizStep>('intro');
  const [currentIntroPage, setCurrentIntroPage] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [answerIdx, setAnswerIdx] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (energy?.properties.currentQuiz?.id) {
      setIsLoading(false);
      setQuizData(energy.properties.currentQuiz);
    }
  }, [energy?.properties?.currentQuiz]);

  useEffect(() => {
    if (energy?.properties.currentAnswerIsCorrect !== undefined) {
      setIsCorrect(energy.properties.currentAnswerIsCorrect);
    }
  }, [energy?.properties.currentAnswerIsCorrect]);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchRefresh());
  }, [dispatch, currentIntroPage, currentStep]); // maintenir la connexion active au maximum

  const navigation = useNavigation();

  const handleNext = () => {
    if (currentIntroPage < 2) {
      setCurrentIntroPage((prev) => prev + 1);
    } else {
      setCurrentStep('question');
    }
  };

  const handleAnswerSelected = (answerIndex: string) => {
    setAnswerIdx(parseInt(answerIndex));
  };

  const submitCheckAnswer = () => {
    setCurrentStep('feedback');
    setIsLoading(true);
    dispatch(checkAnswer({ quizId: energy?.properties.currentQuiz?.properties.quizId as string, answerIdx }));
  };

  useEffect(() => {
    if (currentStep === 'feedback') {
      setIsLoading(false);
    }
  }, [currentStep]);

  const submitAnswer = () => {
    navigation.navigate(IEnergyStackPages.WIN_GREEN_EUROS as never);
    dispatch(computeRewards());
  };

  const renderIntroductionContent = (quizData: Quiz | null) => {
    return !quizData?.properties.intros ? (
      <LoaderSplashScreen />
    ) : (
      <BottomTabs
        tabsCount={3}
        colorInactive={Colors.primary.lightGrey}
        contents={
          quizData.properties.intros.map((content: string, index: number) => (
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

  const renderQuestionContent = (quizData: Quiz | null) => {
    return !quizData?.properties.question ? (
      <LoaderSplashScreen />
    ) : (
      <View style={styles.questionContainer}>
        <Question
          question={quizData?.properties?.question as string}
          choices={quizData?.properties?.choices?.map((choice: string) => choice) as string[]}
          onAnswerSelected={handleAnswerSelected}
          loading={isLoading}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={submitCheckAnswer} title={t('screens.energy.quiz.button-question')} long />
        </View>
      </View>
    );
  };

  const renderFeedbackContainer = (isCorrect: boolean | null, energy: Energy | null) => {
    return isCorrect === null || !energy?.properties.currentQuiz?.properties.reward ? (
      <LoaderSplashScreen />
    ) : (
      <View style={styles.feedbackContainer}>
        <Feedback
          isCorrect={isCorrect as boolean}
          reward={energy.properties.currentQuiz.properties.reward as number}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={submitAnswer}
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
      {currentStep === 'intro' && renderIntroductionContent(quizData)}
      {currentStep === 'question' && renderQuestionContent(quizData)}
      {currentStep === 'feedback' && renderFeedbackContainer(isCorrect, energy)}
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
