import { useCallback } from 'react';
import { View, Platform, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import DocumentPickr from 'react-native-document-picker';
import * as FileSystem from 'expo-file-system';

import { calculateBase64Size } from '@clean-rn/utils';
import { DocumentError } from '@clean-rn/kyc/domain';

import { SecondaryButton } from '../../buttons/secondary-button';
import { Colors } from '../../../constants';
import { ImportDocument } from '../../../assets';

type IProps = {
  setLoading: (loading: boolean) => void;
  getDocument: (doc: string) => void;
  handleError: (error: unknown) => void;
};

const convertPDFToBase64 = async (uri: string) => {
  const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
  if (calculateBase64Size(base64) > 1000000) {
    throw new DocumentError.DocumentTooLarge();
  }
  return base64;
};

export const DocumentPicker = (props: IProps) => {
  const { t } = useTranslation();
  const selectPDF = async (): Promise<void> => {
    props.setLoading(true);

    try {
      const result = await DocumentPickr.pickSingle({
        type: Platform.OS === 'ios' ? ['com.adobe.pdf', 'public.image'] : ['application/pdf', 'image/*'],
        mode: 'open',
      });
      let fileUri = result.uri;
      if (Platform.OS === 'android' && FileSystem.documentDirectory) {
        // Copier le fichier dans un emplacement temporaire
        const newUri = FileSystem.documentDirectory + result.name;
        await FileSystem.copyAsync({
          from: fileUri,
          to: newUri,
        });
        fileUri = newUri;
      }
      const base64String = await convertPDFToBase64(fileUri);
      props.getDocument(base64String);
      props.setLoading(false);
    } catch (err) {
      props.setLoading(false);

      if (!DocumentPickr.isCancel(err)) {
        props.handleError(err);
        return;
      }
      console.log('User cancelled the picker');
    } finally {
      props.setLoading(false);
    }
  };

  const handleOnPress = useCallback(() => {
    selectPDF();
  }, []);

  return (
    <SecondaryButton
      long
      title={t('button.document')}
      iconOne={() => (
        <View style={styles.iconContainer}>
          <ImportDocument style={{ color: Colors.bank.primary.white } as StyleProp<ViewStyle>} />
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
