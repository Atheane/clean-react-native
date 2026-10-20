import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import ViewShot from 'react-native-view-shot';
import Share, { ShareSingleOptions } from 'react-native-share'; // allow sharing images on ios AND android

import { PrimaryButton } from '../../buttons/primary-button';
import { Logger } from '@clean-rn/logger';

type IProps = {
  children: React.ReactElement;
  title: string;
  message: string;
  handleError: (error: unknown) => void;
};

export const ShareScreen = ({ children, title, handleError, message }: IProps) => {
  const { t } = useTranslation();

  const viewShot = useRef<ViewShot | null>(null);

  const shareImage = async (uri: string) => {
    try {
      const options = {
        url: uri,
        // title: t('screens.carbon.title'),
        message,
      } as ShareSingleOptions;
      // https://github.com/react-native-share/react-native-share/issues/861
      // seul le message est envoyé sur whatsapp ios
      // await Share.open(options);

      await Share.open(options);
    } catch (error: unknown) {
      if (error instanceof Error && !!error.message && error.message.includes('User did not share')) {
        Logger.getInstance().info('User did not share');
        return;
      }
      handleError(error);
    }
  };
  const captureAndShareScreenshot = async () => {
    try {
      const uri = await viewShot?.current?.capture();
      // Sharing.shareAsync('file://' + uri);
      if (!uri) {
        throw new Error('uri is undefined');
      }
      await shareImage('file://' + uri);
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
