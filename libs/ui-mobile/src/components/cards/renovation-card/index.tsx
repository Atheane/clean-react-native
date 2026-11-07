import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';

import { Colors, FontNames } from '../../../constants';
import { SnowFlake, Summer, Temperature } from '../../../assets/svg';

type IProps = {
  season: 'winter' | 'summer';
  textHeader: string;
  textTagLeft: string;
  textkWhLeft: string;
  textPriceLeft: string;
  textGranularity: string;
  textTagRight: string;
  textPriceRight: string;
  textkWhRight: string;
  footerText?: string;
  style?: StyleProp<ViewStyle>;
};

// green colors are specific to this component...
const LIGHT_GREEN = '#C7D7521A';
const GREEN = '#C7D752';

export const RenovationCard = (props: IProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: props.season === 'winter' ? Colors.secondary.mediumBlue : GREEN,
          },
        ]}
      >
        {props.season === 'winter' ? (
          <View style={styles.headerTextContainer}>
            <SnowFlake color={Colors.primary.white} width={27} />
            <Text style={styles.headerText}>{props.textHeader}</Text>
          </View>
        ) : (
          <View style={styles.headerTextContainer}>
            <Summer color={Colors.primary.white} style={{ marginTop: 10 }} />
            <Text style={styles.headerText}>{props.textHeader}</Text>
          </View>
        )}
      </View>
      <View
        style={[
          styles.contentContainer,
          {
            backgroundColor: props.season === 'winter' ? Colors.secondary.lightBlue : LIGHT_GREEN,
            height: props.season === 'winter' ? 220 : 200,
          },
        ]}
      >
        <View style={styles.contentLeftContainer}>
          <View style={[styles.tagContainer, { alignSelf: 'flex-end' }]}>
            <Text style={styles.tagText}>{props.textTagLeft}</Text>
          </View>
          <Text style={[styles.textkWh, { textAlign: 'right' }]}>{props.textkWhLeft}</Text>
          <Text style={[styles.textPrice, { textAlign: 'right' }]}>{props.textPriceLeft}</Text>
          <Text style={[styles.textGranularity, { textAlign: 'right' }]}>{props.textGranularity}</Text>
        </View>
        <View style={styles.contentCenterContainer}>
          <View
            style={[
              styles.verticalLine,
              props.season === 'winter'
                ? { borderColor: Colors.secondary.mediumBlue }
                : { borderColor: Colors.primary.lightGreen },
            ]}
          />
          <Temperature
            color={props.season === 'winter' ? Colors.secondary.mediumBlue : Colors.primary.lightGreen}
            width={44}
            height={64}
            style={styles.icon}
            circleColor={Colors.secondary.salmon}
          />
          <View style={styles.tagDegreeContainer}>
            <Text style={styles.tagDegreeText}>{props.season === 'winter' ? '+1°C' : '-1°C'}</Text>
          </View>
        </View>

        <View style={styles.contentRightContainer}>
          <View style={[styles.tagContainer, { alignSelf: 'flex-start' }]}>
            <Text style={styles.tagText}>{props.textTagRight}</Text>
          </View>
          <Text style={[styles.textkWh, { textAlign: 'left' }]}>{props.textkWhRight}</Text>
          <Text style={[styles.textPrice, { textAlign: 'left' }]}>{props.textPriceRight}</Text>
          <Text style={[styles.textGranularity, { textAlign: 'left' }]}>{props.textGranularity}</Text>
        </View>
      </View>
      {props.season === 'summer' && (
        <View style={[styles.footerContainer]}>
          <Text style={styles.footerText}>{props.footerText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 342,
    borderRadius: 20,
  },
  headerContainer: {
    height: 48,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    paddingTop: 8,
    paddingLeft: 12,
    fontFamily: FontNames.MartelSans_800ExtraBold,
    fontSize: 24,
    color: Colors.primary.white,
    fontWeight: '800',
  },
  contentContainer: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentLeftContainer: {
    width: '37%',
    paddingTop: 40,
  },
  contentCenterContainer: {
    width: '26%',
    alignSelf: 'center',
  },
  contentRightContainer: {
    width: '37%',
    paddingTop: 40,
  },
  tagContainer: {
    width: 107,
    justifyContent: 'center',
    height: 30,
    borderRadius: 50,
    backgroundColor: Colors.secondary.salmon,
    marginBottom: 30,
  },
  tagText: {
    textAlign: 'center',
    fontFamily: FontNames.MartelSans_800ExtraBold,
    fontSize: 20,
    color: Colors.primary.white,
    fontWeight: '800',
  },
  textkWh: {
    fontFamily: FontNames.MartelSans_800ExtraBold,
    fontSize: 24,
    color: Colors.secondary.salmon,
    paddingTop: 4,
    lineHeight: 20,
    fontWeight: '800',
  },
  textPrice: {
    fontFamily: FontNames.MartelSans_800ExtraBold,
    fontSize: 24,
    color: Colors.primary.grey,
    paddingTop: 4,
    lineHeight: 20,
    fontWeight: '800',
  },
  textGranularity: {
    fontFamily: FontNames.MartelSans_800ExtraBold,
    fontSize: 16,
    color: Colors.primary.grey,
    paddingTop: 4,
    lineHeight: 20,
    fontWeight: '800',
  },
  verticalLine: {
    width: 1,
    alignSelf: 'center',
    borderWidth: 1,
    height: 40,
  },
  icon: { alignSelf: 'center', marginTop: 10 },
  tagDegreeContainer: {
    width: 56,
    height: 25,
    backgroundColor: Colors.primary.white,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 12,
  },
  tagDegreeText: {
    fontFamily: FontNames.MartelSans_800ExtraBold,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.secondary.salmon,
    fontWeight: '800',
    paddingTop: 4,
  },
  footerContainer: {
    height: 110,
    backgroundColor: Colors.primary.darkBlue,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  footerText: {
    paddingTop: 16,
    fontFamily: FontNames.MartelSans_600SemiBold,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.primary.white,
    paddingBottom: 20,
    lineHeight: 24,
  },
});
