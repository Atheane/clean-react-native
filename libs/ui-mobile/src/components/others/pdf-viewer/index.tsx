import { useCallback, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import { LinearProgress } from '@rneui/themed';

import { Colors } from '../../../constants';

type IProps = {
  uri: string;
  handleError: (error: unknown) => void;
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

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={{ uri: props.uri, cache: true }}
        onError={handleError}
        style={styles.pdf}
        onLoadProgress={handleProgress}
        renderActivityIndicator={() => (
          <LinearProgress value={progress} color={Colors.bank.primary.darkGreen} style={styles.progress} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
