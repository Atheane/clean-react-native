import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors, FontNames, Reward } from '@clean-rn/ui-mobile';
import { FeedbackTrue, FeedbackFalse } from '../../assets/images';

type IProps = {
  isCorrect: boolean;
};

export const Feedback = ({ isCorrect }: IProps) => {
  const { t } = useTranslation();

  if (isCorrect) {
    return (
      <View style={styles.container}>
        <View style={styles.imageTrueContainer}>
          <Image source={FeedbackTrue} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t('screens.energy.feedback.correct')}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{t('screens.energy.feedback.correct-description')}</Text>
          </View>
          <View style={styles.rewardContainer}>
            <Reward reward={1.25} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={FeedbackFalse} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('screens.energy.feedback.incorrect')}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{t('screens.energy.feedback.incorrect-description')}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardContainer: {},
  imageContainer: {
    alignItems: 'center',
  },
  imageTrueContainer: {
    alignItems: 'center',
    marginLeft: 8,
  },
  textContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.25,
    left: Dimensions.get('window').width * 0.23,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.5,
  },
  title: {
    fontSize: 52,
    fontFamily: FontNames.MartelSans_900Black,
    fontWeight: '700',
    color: Colors.primary.white,
  },
  description: {
    fontSize: 16,
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.primary.white,
    textAlign: 'center',
    lineHeight: 24,
  },
  titleContainer: {
    marginBottom: 16,
  },
  descriptionContainer: {
    marginBottom: 16,
    width: Dimensions.get('window').width * 0.55,
  },
});
