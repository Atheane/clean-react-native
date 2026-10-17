import { View, Text, StyleSheet } from 'react-native';
import { Icon, Divider } from '@rneui/themed';
import { Story } from '@storybook/react-native';

export enum ValidationStatus {
  VALIDATED = 'VALIDATED',
  NOT_VALIDATED = 'NOT_VALIDATED',
  PENDING = 'PENDING',
}

export const WithSwitchBelow = (Story: Story, validationStatus: ValidationStatus) => {
  return (
    <View style={styles(validationStatus).mainContainer}>
      <View style={styles(validationStatus).storyContainer}>
        <Story />
      </View>
      <Divider />
      {validationStatus === ValidationStatus.VALIDATED && (
        <View style={styles(validationStatus).switchContainer}>
          <Icon name="checkcircleo" type="ant-design" color="#52c41a" />
          <Text style={styles(validationStatus).title}> Story is validated </Text>
        </View>
      )}
      {validationStatus === ValidationStatus.NOT_VALIDATED && (
        <View style={styles(validationStatus).switchContainer}>
          <Icon name="closecircleo" type="ant-design" color="#eb2f96" />
          <Text style={styles(validationStatus).title}> Story is not validated </Text>
        </View>
      )}
      {validationStatus === ValidationStatus.PENDING && (
        <View style={styles(validationStatus).switchContainer}>
          <Icon name="clockcircleo" type="ant-design" color="grey" />
          <Text style={styles(validationStatus).title}> Story validation is pending </Text>
        </View>
      )}
    </View>
  );
};

const styles = (validationStatus: ValidationStatus) => {
  let color: string;

  switch (validationStatus) {
    case ValidationStatus.VALIDATED:
      color = '#52c41a';
      break;
    case ValidationStatus.NOT_VALIDATED:
      color = '#eb2f96';
      break;
    default:
      color = 'grey';
      break;
  }

  return StyleSheet.create({
    mainContainer: {
      alignItems: 'center',
      height: '100%',
    },
    switchContainer: {
      bottom: -200,
      justifyContent: 'center',
      flexDirection: 'row',
      flex: 1,
    },
    title: {
      color,
      textAlign: 'center',
      paddingVertical: 5,
      marginBottom: 10,
      marginRight: 20,
    },
    storyContainer: {
      flex: 5,
    },
  });
};
