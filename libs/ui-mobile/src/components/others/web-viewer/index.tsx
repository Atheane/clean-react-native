import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { ServerError } from '@clean-rn/shared/infrastructure';

import { Colors } from '../../../constants';

// ok on IOS
// on Android, the pdf is downloaded https://github.com/react-native-webview/react-native-webview/issues/2397
export const WebViewer = ({
  uri,
  headers,
  handleHttpError,
}: {
  uri: string;
  headers?: { [key: string]: string };
  handleHttpError: (error: ServerError) => void;
}) => {
  return (
    <View style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        source={{ uri, headers }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          const error = new ServerError({
            statusCode: nativeEvent.statusCode,
            message: 'server error when loading webview',
            path: nativeEvent.url,
          });
          handleHttpError(error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.lightGrey,
  },
});
