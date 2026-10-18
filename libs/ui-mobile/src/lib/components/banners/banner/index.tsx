import { StyleSheet, Text, View } from 'react-native';
import { Header } from '@rneui/themed';

import { RightChevron, Warning } from '../../../assets';
import { Colors, FontNames } from '../../../constants';
import { LinkButtonColors, BannerColors } from '../../../types';
import { LinkButton } from '../../buttons/link-button';

type IProps = {
  title: string;
  color: BannerColors;
  onPressRightIcon?: () => void;
  rightIcon?: boolean;
};

export const Banner = (props: IProps) => {
  return props.rightIcon ? (
    <Header
      leftComponent={
        <View style={styles(props).leftIcon}>
          <Warning />
        </View>
      }
      centerComponent={
        <View style={styles(props).textContainer}>
          <Text style={styles(props).title}>{props.title}</Text>
        </View>
      }
      rightComponent={
        <View style={styles(props).rightIcon}>
          {props.onPressRightIcon ? (
            <LinkButton
              pressed={false}
              onPress={props.onPressRightIcon}
              iconOne={() => (
                <RightChevron width={16} height={26} style={{ color: Colors.bank.primary.white }} />
              )}
              colorOption={LinkButtonColors.WHITE}
            />
          ) : (
            <LinkButton
              pressed={false}
              onPress={() => {
                return null;
              }}
              iconOne={() => (
                <RightChevron width={16} height={26} style={{ color: Colors.bank.primary.white }} />
              )}
              colorOption={LinkButtonColors.WHITE}
            />
          )}
        </View>
      }
      containerStyle={styles(props).container}
    />
  ) : (
    <Header
      leftComponent={
        <View style={styles(props).leftIcon}>
          <Warning />
        </View>
      }
      centerComponent={
        <View style={styles(props).textContainer}>
          <Text style={styles(props).title}>{props.title}</Text>
        </View>
      }
      rightComponent={
        <View style={styles(props).rightIcon}>
          <LinkButton
            pressed={false}
            onPress={() => {
              return null;
            }}
            iconOne={() => <RightChevron width={16} height={26} style={{ color: Colors.bank.transparent }} />}
            colorOption={LinkButtonColors.WHITE}
          />
        </View>
      }
      containerStyle={styles(props).container}
    />
  );
};

const styles = (props: IProps) =>
  StyleSheet.create({
    container: {
      backgroundColor:
        props.color === BannerColors.PINK ? Colors.bank.secondary.salmon : Colors.bank.primary.lightPurple,
      alignItems: 'center',
    },
    textContainer: {
      alignItems: 'center',
    },
    title: {
      color: Colors.bank.primary.white,
      fontSize: 18,
      fontFamily: FontNames.MartelSans_700Bold,
      fontWeight: '700',
    },
    leftIcon: { marginLeft: 8 },
    rightIcon: { marginTop: -8 },
  });
