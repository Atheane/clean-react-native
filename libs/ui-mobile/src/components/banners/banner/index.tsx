import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Header, useTheme } from '@rneui/themed';

import { RightChevron, Warning } from '../../../assets';
import { Colors } from '../../../constants';
import { LinkButtonColors, BannerColors } from '../../../types';
import { LinkButton } from '../../buttons/link-button';

type IProps = {
  title: string;
  colorBanner: BannerColors;
  onPressRightIcon?: () => void;
  rightIcon?: boolean;
};

export const Banner = (props: IProps) => {
  const { theme } = useTheme();
  return props.onPressRightIcon ? (
    <TouchableOpacity onPress={props.onPressRightIcon}>
      <Header
        leftComponent={
          <View style={styles.leftIcon}>
            <Warning />
          </View>
        }
        centerComponent={
          <View style={theme.container.centeredItem}>
            <Text style={theme.text.banner}>{props.title}</Text>
          </View>
        }
        rightComponent={<RightChevron width={16} height={20} style={{ color: Colors.primary.white }} />}
        containerStyle={[
          theme.container.centeredItem,
          {
            backgroundColor:
              props.colorBanner === BannerColors.PINK ? Colors.secondary.salmon : Colors.primary.lightPurple,
          },
        ]}
      />
    </TouchableOpacity>
  ) : (
    <Header
      leftComponent={
        <View style={styles.leftIcon}>
          <Warning />
        </View>
      }
      centerComponent={
        <View style={theme.container.centeredItem}>
          <Text style={theme.text.banner}>{props.title}</Text>
        </View>
      }
      rightComponent={
        <View style={styles.rightIcon}>
          <LinkButton
            onPress={() => {
              return null;
            }}
            iconRight={() => <RightChevron width={16} height={26} style={{ color: Colors.transparent }} />}
            colorOption={LinkButtonColors.WHITE}
          />
        </View>
      }
      containerStyle={[
        theme.container.centeredItem,
        {
          backgroundColor:
            props.colorBanner === BannerColors.PINK ? Colors.secondary.salmon : Colors.primary.lightPurple,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  leftIcon: { marginLeft: 8 },
  rightIcon: { marginTop: -24 },
});
