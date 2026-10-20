import { useCallback } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import DocumentScan, { ResponseType } from 'react-native-document-scanner-plugin';

import { PrimaryButton } from '../../buttons/primary-button';
import { Colors } from '../../../constants';
import { Camera as CameraIcon } from '../../../assets';

type IProps = {
  getScan: (scannedImg: string) => void;
  handleError: (error: unknown) => void;
};
export const DocumentScanner = (props: IProps) => {
  const { t } = useTranslation();
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
        // setScannedImage(scannedImages[0]);
        props.getScan(scannedImages[0]);
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
