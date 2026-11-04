import { View, Text, Image, StyleSheet, Platform, Dimensions } from 'react-native';
import { useTheme, Skeleton } from '@rneui/themed';
import { Colors } from '../../../constants';
import { GreenEuro } from '../../../assets/images';
import { LinearGradient } from 'expo-linear-gradient';

export const TotalReward = ({
  totalRewards,
  title,
  loading,
}: {
  totalRewards: number;
  title: string;
  loading: boolean;
}) => {
  const { theme } = useTheme();
  return loading ? (
    <Skeleton
      LinearGradientComponent={LinearGradient}
      animation="pulse"
      width={Dimensions.get('window').width * 0.85}
      height={40}
      style={{ marginVertical: 10, borderRadius: 8, backgroundColor: Colors.primary.lightGrey }}
    />
  ) : (
    <View style={styles.greenEurosContainer}>
      <Text style={theme.text.boldDarkBlue}>{title} : </Text>

      <Text style={[theme.text.boldDarkBlue, { color: Colors.primary.white, fontSize: 24 }]}>
        {totalRewards}
      </Text>

      <View style={styles.imgContainer}>
        <Image source={GreenEuro} style={styles.greenEuroImg} />
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
