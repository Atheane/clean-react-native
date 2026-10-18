import { StyleSheet, Text, View } from 'react-native';
import { Header, useTheme } from '@rneui/themed';

import { RightChevron, Warning } from '../../../assets';
import { Colors } from '../../../constants';
import { LinkButtonColors, BannerColors } from '../../../types';
import { LinkButton } from '../../buttons/link-button';

type IProps = {
  title: string;
  color: BannerColors;
  onPressRightIcon?: () => void;
  rightIcon?: boolean;
};

export const Banner = (props: IProps) => {
  const { theme } = useTheme();
  return props.rightIcon ? (
    <Header
      leftComponent={
        <View style={styles.leftIcon}>
          <Warning />
        </View>
      }
      centerComponent={
        <View style={theme.bank.container.centeredItem}>
          <Text style={theme.bank.text.banner}>{props.title}</Text>
        </View>
      }
      rightComponent={
        <View style={styles.rightIcon}>
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
      containerStyle={[
        theme.bank.container.centeredItem,
        {
          backgroundColor:
            props.color === BannerColors.PINK
              ? Colors.bank.secondary.salmon
              : Colors.bank.primary.lightPurple,
        },
      ]}
    />
  ) : (
    <Header
      leftComponent={
        <View style={styles.leftIcon}>
          <Warning />
        </View>
      }
      centerComponent={
        <View style={theme.bank.container.centeredItem}>
          <Text style={theme.bank.text.banner}>{props.title}</Text>
        </View>
      }
      rightComponent={
        <View style={styles.rightIcon}>
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
      containerStyle={[
        theme.bank.container.centeredItem,
        {
          backgroundColor:
            props.color === BannerColors.PINK
              ? Colors.bank.secondary.salmon
              : Colors.bank.primary.lightPurple,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  leftIcon: { marginLeft: 8 },
  rightIcon: { marginTop: -24 },
});
