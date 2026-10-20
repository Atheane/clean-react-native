import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useTheme } from '@rneui/themed';

// import { DeleteGradient, Edit } from '../../../assets';
import { Edit, GreenValidation, RedCross, GreyPending } from '../../../assets';
import { Colors, FontNames } from '../../../constants';
import { LinkButtonColors } from '../../../types';
import { LinkButton } from '../../buttons/link-button';

type IProps = {
  image: ImageSourcePropType;
  imageDisabled: ImageSourcePropType;
  status: 'VALIDATED' | 'PENDING' | 'REFUSED';
  text: string;
  disabled?: boolean;
  onPress: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
};

export const UploadDocumentCard = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        activeOpacity={props.disabled ? 1 : 0.2}
        style={[
          theme.bank.container.card.long,
          !props.disabled && theme.bank.shadow.card,
          props.disabled && styles.disabled,
        ]}
      >
        <View style={styles.container}>
          <Image style={styles.image} source={props.disabled ? props.imageDisabled : props.image} />
          <Text style={[props.disabled ? theme.bank.text.grey : theme.bank.text.darkBlue, styles.text]}>
            {props.text}
          </Text>
        </View>
      </TouchableOpacity>
      {props.status && (
        <View style={styles.leftIcon}>
          {props.status === 'VALIDATED' && <GreenValidation />}
          {props.status === 'PENDING' && <GreyPending />}
          {props.status === 'REFUSED' && <RedCross />}
        </View>
      )}
      {props.onEdit && (
        <View style={styles.rightIcon}>
          <LinkButton
            pressed={false}
            onPress={props.onEdit}
            iconOne={Edit}
            colorOption={LinkButtonColors.BLUE}
          />
        </View>
      )}
      {/* {props.onDelete && (
        <View style={styles.rightIcon}>
          <LinkButton
            pressed={false}
            onPress={props.onDelete}
            iconOne={DeleteGradient}
            colorOption={LinkButtonColors.BLUE}
          />
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: Colors.bank.primary.lightGrey,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
    fontFamily: FontNames.Roboto_400Regular,
    fontSize: 16,
  },
  leftIcon: {
    position: 'absolute',
    top: 16,
    left: 24,
  },
  rightIcon: {
    position: 'absolute',
    top: 8,
    right: 20,
  },
});
