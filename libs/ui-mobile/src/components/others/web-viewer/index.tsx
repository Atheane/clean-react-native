import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Colors } from '../../../constants';

// ok on IOS
// on Android, the pdf is downloaded https://github.com/react-native-webview/react-native-webview/issues/2397
export const WebViewer = ({ uri }: { uri: string }) => {
  return (
    <View style={styles.container}>
      <WebView style={{ flex: 1 }} source={{ uri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.lightGrey,
  },
});
