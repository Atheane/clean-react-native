import { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { ServerError } from '@clean-rn/shared/infrastructure';

import { Colors } from '../../../constants';

type IProps = {
  uri: string;
  headers?: { [key: string]: string };
  handleError: (error: unknown) => void;
};

export const WebViewer = (props: IProps) => {
  const webviewRef = useRef<WebView | null>(null);

  const handleServerError = ({ nativeEvent }: { nativeEvent: { url: string; statusCode: number } }) => {
    const serverError = nativeEvent.statusCode
      ? new ServerError({
          statusCode: nativeEvent.statusCode,
          message: 'server error when loading webview',
          path: nativeEvent.url,
        })
      : nativeEvent;
    props.handleError(serverError);
  };

  const handleError = (event: any) => {
    props.handleError(event);
  };

  return (
    <View style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        ref={webviewRef}
        source={{ uri: props.uri, headers: props.headers }}
        onError={handleError}
        onHttpError={handleServerError}
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
