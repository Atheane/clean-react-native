import { useCallback, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import { LinearProgress } from '@rneui/themed';

import { Colors } from '../../../constants';

type IProps = {
  uri: string;
  getPdf?: (pdfPath: string) => void;
  handleError: (error: unknown) => void;
  headers?: { [key: string]: string };
};

export const PdfViewer = (props: IProps) => {
  const handleError = useCallback(
    (error: Error) => {
      if (error?.message.includes('canceled')) {
        return null;
      }
      props.handleError(error);
    },
    [props],
  );

  const [progress, setProgress] = useState<number>();

  const handleProgress = useCallback((progress: number) => {
    setProgress(progress);
  }, []);

  const handleGetPdf = useCallback((pdfPath: string) => {
    if (props.getPdf) props.getPdf(pdfPath);
  }, []);

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={props.headers ? { uri: props.uri, cache: true, headers: props.headers } : { uri: props.uri }}
        onError={handleError}
        style={styles.pdf}
        onLoadProgress={handleProgress}
        onLoadComplete={(_, pdfPath) => {
          handleGetPdf(pdfPath);
        }}
        renderActivityIndicator={() => (
          <LinearProgress value={progress} color={Colors.bank.primary.darkGreen} style={styles.progress} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -50,
    left: 0,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  progress: {
    width: '100%',
    height: 8,
    position: 'absolute',
    top: 0,
  },
});
