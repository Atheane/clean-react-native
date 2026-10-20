import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Icon, useTheme } from '@rneui/themed';

// import { DeleteGradient, Edit } from '../../../assets';
import { Edit, GreenValidation } from '../../../assets';
import { Colors, FontNames } from '../../../constants';
import { LinkButtonColors } from '../../../types';
import { LinkButton } from '../../buttons/link-button';

type IProps = {
  image: ImageSourcePropType;
  imageDisabled: ImageSourcePropType;
  status?: 'VALIDATED' | 'PENDING' | 'REFUSED';
  text: string;
  disabled?: boolean;
  onPress: () => void;
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
        {props.status && (
          <View style={styles.leftIconContainer}>
            {props.status === 'VALIDATED' && (
              <View style={styles.rightIcon}>
                <GreenValidation />
              </View>
            )}
            {props.status === 'PENDING' && (
              <Icon name="clockcircleo" type="ant-design" color="grey" style={styles.rightIcon} />
            )}
            {props.status === 'REFUSED' && (
              <Icon name="closecircleo" type="ant-design" color="red" style={styles.rightIcon} />
            )}
          </View>
        )}
      </TouchableOpacity>
      {props.onEdit && (
        <View style={styles.rightIconContainer}>
          <LinkButton
            pressed={false}
            onPress={props.onEdit}
            iconOne={Edit}
            colorOption={LinkButtonColors.BLUE}
          />
        </View>
      )}
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
  leftIconContainer: {
    position: 'absolute',
    top: 8,
    left: 10,
  },
  rightIconContainer: {
    position: 'absolute',
    top: 8,
    right: 20,
  },
  rightIcon: { backgroundColor: Colors.bank.primary.white, borderRadius: 100 },
});
