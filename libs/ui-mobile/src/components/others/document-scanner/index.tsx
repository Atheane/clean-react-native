import { useEffect } from 'react';
import { View } from 'react-native';
import DocumentScan, { ResponseType } from 'react-native-document-scanner-plugin';

type IProps = {
  getScan: (scannedImg: string) => string;
  handleError: (error: unknown) => void;
};
export const DocumentScanner = (props: IProps) => {
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

  useEffect(() => {
    scanDocument();
  }, []);

  return <View />;
};
