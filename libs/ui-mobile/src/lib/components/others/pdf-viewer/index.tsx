import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

// ok on IOS
// on Android, the pdf is downloaded https://github.com/react-native-webview/react-native-webview/issues/2397
export const PdfViewer = ({ url: uri }: { url: string }) => {
  return (
    <View style={styles.container}>
      <WebView style={{ flex: 1 }} source={{ uri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});
