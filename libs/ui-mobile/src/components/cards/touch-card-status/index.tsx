import { FC } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';
import { Colors } from '../../../constants';
import { Edit, GreenValidation, RedCross } from '../../../assets';

enum ISituationStatus {
  INIT = 'INIT', // form request template is created, but is not sent for review
  CANCELED = 'CANCELED', // form request is canceled before analysis
  PENDING = 'PENDING', // form request has pending status
  VALIDATED = 'VALIDATED', // form request is validated
  REFUSED = 'REFUSED', // form request is refused
}

type IProps = {
  icon: React.FC<SvgProps>;
  text: string;
  onPress: () => void;
  status?: ISituationStatus;
};

const KPI_CARD_RATIO = 112 / 174;

export const TouchCardStatus: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  const disabled =
    props.status === ISituationStatus.PENDING ||
    props.status === ISituationStatus.VALIDATED ||
    props.status === ISituationStatus.CANCELED;

  const smallSize = Platform.OS === 'web' ? 30 : 18;
  const mediumSize = Platform.OS === 'web' ? 42 : 26;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        theme.container.card.kpi,
        Platform.OS === 'web' ? styles.webContainer : theme.shadow.card,
        disabled && styles.disabled,
      ]}
      disabled={disabled}
    >
      <View style={styles.container}>
        <props.icon />
        <Text style={[theme.text.boldDarkBlue, { marginTop: 8 }]}>{props.text}</Text>
      </View>
      {props.status === 'REFUSED' && (
        <View style={styles.leftIconContainer}>
          <RedCross width={mediumSize} height={mediumSize} />
        </View>
      )}
      {props.status === 'REFUSED' && (
        <View style={styles.rightIconContainer}>
          <Edit
            startColor={Colors.primary.darkBlue}
            endColor={Colors.secondary.pink}
            width={smallSize}
            height={smallSize}
          />
        </View>
      )}
      {props.status === 'VALIDATED' && (
        <View style={[styles.leftIconContainer, styles.icon]}>
          <GreenValidation color={Colors.greenGradient.lightGreen} width={smallSize} height={smallSize} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: Colors.primary.lightGrey,
    opacity: 0.9,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webContainer: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 500,
    minHeight: Dimensions.get('window').width * 0.9 * KPI_CARD_RATIO * 0.5,
  },
  leftIconContainer: {
    position: 'absolute',
    top: 14,
    left: 16,
    backgroundColor: Colors.primary.white,
    borderRadius: 100,
  },
  icon: { backgroundColor: Colors.primary.white, borderRadius: 100 },
  rightIconContainer: {
    position: 'absolute',
    top: 16,
    right: 20,
  },
});
