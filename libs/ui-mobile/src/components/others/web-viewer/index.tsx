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
  handleHttpError: (error: unknown) => void;
}) => {
  const handleServerError = ({ nativeEvent }: { nativeEvent: { url: string; statusCode: number } }) => {
    const error = nativeEvent.statusCode
      ? new ServerError({
          statusCode: nativeEvent.statusCode,
          message: 'server error when loading webview',
          path: nativeEvent.url,
        })
      : nativeEvent;
    handleHttpError(error);
  };

  return (
    <View style={styles.container}>
      <WebView style={{ flex: 1 }} source={{ uri, headers }} onHttpError={handleServerError} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.lightGrey,
  },
});
