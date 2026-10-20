import { useCallback } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import DocumentScan, { ResponseType } from 'react-native-document-scanner-plugin';
import { Image } from 'react-native-compressor';
import * as FileSystem from 'expo-file-system';

import { PrimaryButton } from '../../buttons/primary-button';
import { Colors } from '../../../constants';
import { Camera as CameraIcon } from '../../../assets';

type IProps = {
  getScan: (scannedImg: string) => void;
  handleError: (error: unknown) => void;
};

const convertBase64ToFileUri = async (base64String: string) => {
  // Générer un chemin de fichier unique
  const fileName = `image_${new Date().getTime()}.jpg`;
  const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

  // Écrire les données base64 dans le fichier
  await FileSystem.writeAsStringAsync(fileUri, base64String, { encoding: FileSystem.EncodingType.Base64 });

  return fileUri;
};

const calculateBase64Size = (base64: string) => {
  // Remplacer les caractères non-Base64 par du vide (pour la sécurité)
  const cleanedBase64String = base64.replace(/[^A-Za-z0-9+/=]/g, '');

  // Calculer la taille en octets de la chaîne Base64
  const base64Length = cleanedBase64String.length;

  // Trouver et soustraire le nombre de caractères de remplissage
  const padding = (cleanedBase64String.match(/=/g) || []).length;

  // Calculer la taille réelle des données binaires
  return ((base64Length - padding) * 3) / 4;
};

const compressImage = async (base64Image: string, quality: number, maxMB = 0.95): Promise<string> => {
  const compressedImage = await Image.compress(base64Image, {
    quality: quality,
  });
  const base64 = await FileSystem.readAsStringAsync(compressedImage, { encoding: 'base64' });

  const compressedSizeMB = calculateBase64Size(base64);

  if (compressedSizeMB > maxMB * 1048576 && quality > 0.1) {
    // Réduisez la qualité et réessayez
    return compressImage(base64Image, quality - 0.1, maxMB);
  } else {
    // Taille acceptable ou qualité minimale atteinte
    return compressedImage;
  }
};

export const DocumentScanner = (props: IProps) => {
  const { t } = useTranslation();
  const scanDocument = async () => {
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
        console.log('imageSizeMB', imageSizeMB);
        if (imageSizeMB > 1000000) {
          const compressedImage = await compressImage(lastScannedImageURI, 0.9, 1);
          const base64 = await FileSystem.readAsStringAsync(compressedImage, { encoding: 'base64' });
          console.log('base64', base64);
          props.getScan(base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(lastScannedImageURI, { encoding: 'base64' });
          props.getScan(base64);
        }
      }
    } catch (error: unknown) {
      props.handleError(error);
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
