import { useCallback } from 'react';
import { View, Platform, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import DocumentPickr, { DocumentPickerResponse } from 'react-native-document-picker';
import ImgToBase64 from 'react-native-image-base64';

import { SecondaryButton } from '../../buttons/secondary-button';
import { Colors } from '../../../constants';
import { ImportDocument } from '../../../assets';

type IProps = {
  getDocument: (doc: DocumentPickerResponse) => void;
  handleError: (error: unknown) => void;
};

export const DocumentPicker = (props: IProps) => {
  const { t } = useTranslation();

  const selectPDF = async (): Promise<void> => {
    try {
      const result = await DocumentPickr.pickSingle({
        type: Platform.OS === 'ios' ? 'com.adobe.pdf' : 'application/pdf',
        mode: 'open',
      });
      const base64String = await ImgToBase64.getBase64String(result.uri);
      props.getDocument(base64String);
    } catch (err) {
      if (!DocumentPickr.isCancel(err)) {
        props.handleError(err);
        return;
      }
      console.log('User cancelled the picker');
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
