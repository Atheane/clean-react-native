import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '../../buttons/primary-button';

type IProps = {
  children: React.ReactElement;
  handleError: (error: unknown) => void;
};

export const ShareScreen = ({ children, handleError }: IProps) => {
  const { t } = useTranslation();

  const viewShot = useRef<ViewShot | null>(null);
  const captureAndShareScreenshot = async () => {
    try {
      const uri = await viewShot.current?.capture();
      Sharing.shareAsync('file://' + uri);
    } catch (error: unknown) {
      handleError(error);
    }
  };
  return (
    <View>
      <ViewShot options={{ format: 'png', quality: 0.9 }} ref={viewShot}>
        {children}
      </ViewShot>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={t('button.share')} onPress={captureAndShareScreenshot} long />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 50,
    alignItems: 'center',
  },
});
