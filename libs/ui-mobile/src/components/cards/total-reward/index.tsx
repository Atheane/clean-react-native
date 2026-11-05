import { View, Text, Image, StyleSheet, Platform, Dimensions } from 'react-native';
import { useTheme, Skeleton } from '@rneui/themed';
import { Colors } from '../../../constants';
import { GreenEuro } from '../../../assets/images';
import { LinearGradient } from 'expo-linear-gradient';
import { QuizWhite } from '../../../assets/svg';
type Size = 'small' | 'big';

export const TotalReward = ({
  totalRewards,
  title,
  loading,
  size = 'small',
}: {
  totalRewards: number;
  title: string;
  loading: boolean;
  size?: Size;
}) => {
  const { theme } = useTheme();
  return loading ? (
    <Skeleton
      LinearGradientComponent={LinearGradient}
      animation="pulse"
      width={Dimensions.get('window').width * (size === 'big' ? 0.95 : 0.85)}
      height={size === 'big' ? 60 : 40}
      style={{ marginVertical: 10, borderRadius: 8, backgroundColor: Colors.primary.lightGrey }}
    />
  ) : (
    <View style={[styles.greenEurosContainer, size === 'big' && styles.bigContainer]}>
      <QuizWhite style={{ marginRight: 10 }} />
      <Text style={[theme.text.boldDarkBlue, size === 'big' && { fontSize: 20 }]}>{title} : </Text>
      <Text
        style={[
          theme.text.boldDarkBlue,
          { color: Colors.primary.white },
          size === 'big' ? { fontSize: 32, paddingTop: 3 } : { fontSize: 24 },
        ]}
      >
        {totalRewards}
      </Text>
      <View style={styles.imgContainer}>
        <Image source={GreenEuro} style={[styles.greenEuroImg, size === 'big' && styles.bigImage]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    marginBottom: 10,
    marginLeft: -5,
  },
  greenEuroImg: {
    marginTop: 8,
    width: 44,
    height: 44,
  },
  bigContainer: {
    width: '95%',
    height: 60,
  },
  bigImage: {
    width: 56,
    height: 56,
  },
  greenEurosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary.lightPurple,
    width: '90%',
    height: 40,
    marginVertical: 8,
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: Platform.OS === 'web' ? 20 : 0,
  },
});
