import { useCallback } from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import ReactNativeBlobUtil from 'react-native-blob-util';
import * as Sharing from 'expo-sharing'; // Importation modifiée

import { PrimaryButton } from '../../buttons/primary-button';
import { LinkButton } from '../../buttons/link-button';
import { Colors } from '../../../constants';

type IProps = {
  uri: string;
  fileName: string;
  headers?: { [key: string]: string };
  handleError: (error: unknown) => void;
  icon: React.FC<SvgProps>;
  primaryButtonTitle?: string;
  nextNavigation?: () => void;
};

export const PdfDownloader = (props: IProps) => {
  const handleError = useCallback(
    (error: Error) => {
      if (error?.message.includes('CANCELLED')) {
        return null;
      }
      props.handleError(error);
    },
    [props],
  );

  const downloadPDF = () => {
    const dirs = ReactNativeBlobUtil.fs.dirs;
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf',
      path: `${dirs.DocumentDir}/${props.fileName}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: props.fileName,
        description: 'File downloaded by download manager.',
        mime: 'application/pdf',
      },
    })
      .fetch('GET', props.uri, props.headers)
      .then(async (res) => {
        // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
        // whereas in android, the download manager is handling the download for us.
        if (Platform.OS === 'android' && props.nextNavigation) {
          props.nextNavigation();
        } else if (Platform.OS === 'ios') {
          const filePath = res.path();
          const isAvailable = await Sharing.isAvailableAsync();
          if (isAvailable) {
            await Sharing.shareAsync(filePath).catch(handleError);
          }
        }
      })
      .catch(props.handleError);
  };

  return props.primaryButtonTitle ? (
    <PrimaryButton title={props.primaryButtonTitle} onPress={downloadPDF} iconOne={props.icon} long />
  ) : (
    <View style={styles.container}>
      <LinkButton onPress={downloadPDF} iconRight={props.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 24,
    left: Dimensions.get('window').width / 2 - 24,
    marginTop: -16,
    zIndex: 1,
  },
  icon: { color: Colors.bank.primary.lightGreen },
});
