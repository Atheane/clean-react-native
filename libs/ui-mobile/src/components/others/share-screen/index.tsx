import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing'; // Import expo-sharing

import { PrimaryButton } from '../../buttons/primary-button';

type IProps = {
  children: React.ReactElement;
  message: string;
  handleError: (error: unknown) => void;
};

export const ShareScreen = ({ children, handleError, message }: IProps) => {
  const { t } = useTranslation();
  const viewShot = useRef<ViewShot | null>(null);

  const shareImage = async (uri: string) => {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        throw new Error('Sharing is not available on this platform');
      }

      await Sharing.shareAsync(uri, {
        mimeType: 'image/png', // Or the correct mime type for your file
        dialogTitle: message,
        UTI: 'public.png', // For iOS
      });
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const captureAndShareScreenshot = async () => {
    try {
      const uri = await viewShot?.current?.capture();
      if (!uri) {
        throw new Error('URI is undefined');
      }
      await shareImage(uri);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  return (
    <View>
      <ViewShot options={{ format: 'png', quality: 0.8 }} ref={viewShot}>
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
