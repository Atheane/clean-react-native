import { useEffect } from 'react';
import { View, Platform } from 'react-native';
import DocumentPickr, { DocumentPickerResponse } from 'react-native-document-picker';

type IProps = {
  getDocument: (doc: DocumentPickerResponse) => DocumentPickerResponse;
  handleError: (error: unknown) => void;
};

export const DocumentPicker = (props: IProps) => {
  const selectPDF = async (): Promise<void> => {
    try {
      const result = await DocumentPickr.pickSingle({
        type: Platform.OS === 'ios' ? 'com.adobe.pdf' : 'application/pdf',
        mode: 'open',
      });
      props.getDocument(result);
    } catch (err) {
      if (!DocumentPickr.isCancel(err)) {
        props.handleError(err);
        return;
      }
      console.log('User cancelled the picker');
    }
  };

  useEffect(() => {
    selectPDF();
  }, []);

  return <View />;
};
