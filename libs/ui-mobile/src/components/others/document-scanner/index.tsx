import { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import DocumentScan, { ResponseType } from 'react-native-document-scanner-plugin';

import { PrimaryButton } from '../../buttons/primary-button';

type IProps = {
  handleError: (error: unknown) => void;
};
export const DocumentScanner = (props: IProps) => {
  const { t } = useTranslation();

  const [scannedImage, setScannedImage] = useState<string>();

  const scanDocument = async () => {
    // start the document scanner
    try {
      const { scannedImages } = await DocumentScan.scanDocument({
        responseType: ResponseType.Base64,
        letUserAdjustCrop: true,
      });
      // get back an array with scanned image file paths
      if (scannedImages && scannedImages.length > 0) {
        // set the img src, so we can view the first scanned image
        setScannedImage(scannedImages[0]);
      }
    } catch (error: unknown) {
      props.handleError(error);
    }
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={t('button.share')} onPress={scanDocument} long />
      </View>
      {!!scannedImage && (
        <Image
          resizeMode="contain"
          style={{ width: '100%', height: '100%' }}
          source={{ uri: scannedImage }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 50,
    alignItems: 'center',
  },
});
