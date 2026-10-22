import { useCallback } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import DocumentScan, { ResponseType } from 'react-native-document-scanner-plugin';
import { Image } from 'react-native-compressor';
import * as FileSystem from 'expo-file-system';

import { Logger } from '@clean-rn/logger';
import { calculateBase64Size } from '@clean-rn/utils';

import { PrimaryButton } from '../../buttons/primary-button';
import { Colors } from '../../../constants';
import { Camera as CameraIcon } from '../../../assets';

type IProps = {
  setLoading: (loading: boolean) => void;
  getScan: (scannedImg: string) => void;
  handleError: (error: unknown) => void;
};

const compressImage = async (imageURI: string, quality: number, maxMB = 0.95): Promise<string> => {
  if (quality <= 0.1) {
    throw new Error('There is a problem with the quality of the image. try on another camera');
  }
  const compressedImageURI = await Image.compress(imageURI, {
    quality,
  });
  const base64 = await FileSystem.readAsStringAsync(compressedImageURI, { encoding: 'base64' });
  const compressedSizeMB = calculateBase64Size(base64);
  Logger.getInstance().info('compressedSizeMB', compressedSizeMB);
  if (compressedSizeMB > maxMB * 1048576 && quality > 0.1) {
    // Réduire la qualité et réessayez
    return compressImage(imageURI, quality - 0.1, maxMB);
  } else {
    // Taille acceptable ou qualité minimale atteinte
    return compressedImageURI;
  }
};

export const DocumentScanner = (props: IProps) => {
  const { t } = useTranslation();

  const scanDocument = async () => {
    props.setLoading(true);
    // start the document scanner
    try {
      const { scannedImages: scannedImagesURI } = await DocumentScan.scanDocument({
        responseType: ResponseType.ImageFilePath,
        croppedImageQuality: 100,
        maxNumDocuments: 1, // max number of images to scan on Android, option not usable on ios
      });
      // get back an array with scanned image file paths
      if (scannedImagesURI && scannedImagesURI.length > 0) {
        // we take last image if sevral images were taken
        const lastScannedImageURI = scannedImagesURI[scannedImagesURI.length - 1];
        const base64 = await FileSystem.readAsStringAsync(lastScannedImageURI, { encoding: 'base64' });
        const imageSizeMB = calculateBase64Size(base64);
        Logger.getInstance().info('imageSizeMB', imageSizeMB);
        if (imageSizeMB > 1000000) {
          const compressedImageURI = await compressImage(lastScannedImageURI, 0.9, 1);
          const base64 = await FileSystem.readAsStringAsync(compressedImageURI, { encoding: 'base64' });
          props.setLoading(false);
          props.getScan(base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(lastScannedImageURI, { encoding: 'base64' });
          props.setLoading(false);
          props.getScan(base64);
        }
      }
    } catch (error: unknown) {
      props.setLoading(false);
      props.handleError(error);
    } finally {
      props.setLoading(false);
    }
  };

  const handleOnPress = useCallback(() => {
    scanDocument();
  }, []);

  return (
    <PrimaryButton
      long
      title={t('button.photo')}
      iconOne={() => (
        <View style={styles.iconContainer}>
          <CameraIcon style={{ color: Colors.bank.primary.white } as StyleProp<ViewStyle>} />
        </View>
      )}
      onPress={handleOnPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 0,
  },
  iconContainer: { position: 'relative', left: 10, top: 2 },
});
