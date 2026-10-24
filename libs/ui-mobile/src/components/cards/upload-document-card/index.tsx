import { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Icon, useTheme, LinearProgress } from '@rneui/themed';
import { NEEDS_SMALL_TEXT } from '../../../constants';
import { IDocumentStatus } from '@clean-rn/kyc/domain';

import { Edit, GreenValidation, DeleteCrossGradient } from '../../../assets';
import { Colors, FontNames } from '../../../constants';
import { LinkButtonColors } from '../../../types';
import { LinkButton } from '../../buttons/link-button';

type IProps = {
  icon: FC<SvgProps>;
  text: string;
  errorMessage?: string;
  onPress: () => void;
  loading?: boolean;
  status?: IDocumentStatus;
  onCancel: () => void;
};

export const UploadDocumentCard = (props: IProps) => {
  const { theme } = useTheme();
  const renderLabel = (text: string) => {
    if (props.status === 'REFUSED' || props.loading) {
      if (text.length > 26) {
        return `${text}`.slice(0, 26) + '...';
      }
    } else {
      if (text.length > 30) {
        return `${text}`.slice(0, 30) + '...';
      }
    }
    return text;
  };
  const disabled = props.status === 'PENDING' || props.status === 'VALIDATED' || props.status === 'CANCELED';
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          theme.bank.container.card.long,
          !disabled && theme.bank.shadow.card,
          disabled && styles.disabled,
          { marginVertical: 16 },
        ]}
        disabled={disabled}
      >
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <props.icon />
          </View>
          <Text style={[disabled ? theme.bank.text.grey : theme.bank.text.darkBlue, styles.text]}>
            {renderLabel(props.text)}
          </Text>

          {props.loading && (
            <View style={styles.cancelIcon}>
              <LinkButton
                onPress={props.onCancel}
                iconRight={DeleteCrossGradient}
                colorOption={LinkButtonColors.BLUE}
              />
            </View>
          )}
        </View>
        {props.status && (
          <View style={styles.leftIconContainer}>
            {props.status === 'VALIDATED' && !props.loading && (
              <View style={styles.rightIcon}>
                <GreenValidation />
              </View>
            )}
            {props.status === 'REFUSED' && !props.loading && (
              <Icon name="closecircleo" type="ant-design" color="red" style={styles.rightIcon} />
            )}
          </View>
        )}
        {props.loading && <LinearProgress color={Colors.bank.primary.darkGreen} style={styles.progress} />}
        {props.status === 'REFUSED' && !props.loading && (
          <View style={styles.rightIconContainer}>
            <Edit />
          </View>
        )}
      </TouchableOpacity>
      {props.errorMessage && !props.loading && (
        <View style={styles.errorMessageContainer}>
          <Text
            style={[
              theme.bank.text.errors,
              styles.errorMessage,
              NEEDS_SMALL_TEXT ? { fontSize: 12, lineHeight: 18 } : { fontSize: 14, lineHeight: 20 },
            ]}
          >
            {props.errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: Colors.bank.primary.lightGrey,
    opacity: 0.8,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
    fontFamily: FontNames.Roboto_400Regular,
    fontSize: NEEDS_SMALL_TEXT ? 12 : 14,
  },
  leftIconContainer: {
    position: 'absolute',
    top: 16,
    left: 20,
    backgroundColor: Colors.bank.primary.white,
    borderRadius: 100,
  },
  rightIconContainer: {
    position: 'absolute',
    top: 26,
    right: 20,
  },
  rightIcon: { backgroundColor: Colors.bank.primary.white, borderRadius: 100 },
  cancelIcon: { top: 4, right: 8, position: 'absolute' },
  loading: {
    alignItems: 'center',
  },
  progress: {
    width: '84%',
    height: 6,
    position: 'absolute',
    bottom: 4,
    left: '8%',
  },
  errorMessageContainer: {
    marginBottom: 0,
    marginLeft: 24,
    width: '90%',
  },
  errorMessage: {
    textAlign: 'left',
  },
});
