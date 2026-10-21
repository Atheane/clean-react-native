import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { IDocumentErrorMessage, IDocumentErrorCodes } from '@clean-rn/kyc/domain';

import {
  DocumentPicker,
  DocumentScanner,
  ErrorMessage,
  LinkButton,
  LinkButtonColors,
} from '@clean-rn/ui-mobile';

import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { addPage } from '../../application/commands/document';

const HEIGHT = Dimensions.get('window').height;

export const UploadDocument = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const {
    params: {
      instruction,
      imageSource,
      anotherInstruction,
      docPickerVisible,
      showExample,
      lastInstruction,
      nextRouteParams,
    },
  } = useRoute() as {
    params: {
      instruction: string;
      imageSource: ImageSourcePropType;
      anotherInstruction?: string;
      docPickerVisible?: boolean;
      showExample?: boolean;
      lastInstruction?: string;
      nextRouteParams?: {
        instruction: string;
        imageSource: ImageSourcePropType;
        anotherInstruction?: string;
        docPickerVisible?: boolean;
        showExample?: boolean;
      };
    };
  };

  const [domainError, setDomainError] = useState<IDomainError<IDocumentErrorCodes, IDocumentErrorMessage>>();
  const dispatch = useDispatch();

  const handleError = useCallback(
    (error: unknown) => {
      if (error.code === IDocumentErrorCodes.DOCUMENT_TOO_LARGE) {
        setDomainError(error as IDomainError<IDocumentErrorCodes, IDocumentErrorMessage>);
      } else {
        dispatch(showUnknownError(error as unknown as Error));
        return;
      }
    },
    [dispatch],
  );

  const handleGetDocument = useCallback(
    (docBase64: string) => {
      dispatch(addPage({ base64: docBase64, nextRouteParams }));
    },
    [dispatch, nextRouteParams],
  );

  const handleShowExample = useCallback(() => {
    console.log('handleShowExample');
    //todo dispatch to upload document usecase
  }, []);

  const [loading, setLoading] = useState(false);

  const handleLoading = useCallback((loading: boolean) => {
    setLoading(loading);
  }, []);

  return loading ? (
    <Text> Loading...</Text>
  ) : (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View>
            <Text style={[theme.bank.text.darkBlue, styles.takePhoto]}>{t('screens.kyc.take-photo')}</Text>
            <Text style={[theme.bank.text.boldDarkBlue, styles.instruction]}>{instruction}</Text>
            <Text style={[theme.bank.text.darkBlue, styles.instruction]}>{anotherInstruction}</Text>
            <Text style={[theme.bank.text.boldDarkBlue, styles.instruction]}>{lastInstruction}</Text>
          </View>
          <Image source={imageSource} />
          {domainError && <ErrorMessage error={domainError} />}

          {!docPickerVisible && !showExample && (
            <View style={styles.buttonContainer}>
              <DocumentScanner
                getScan={handleGetDocument}
                handleError={handleError}
                setLoading={handleLoading}
              />
            </View>
          )}
          {!docPickerVisible && showExample && (
            <View style={styles.buttonContainer}>
              <DocumentScanner
                getScan={handleGetDocument}
                handleError={handleError}
                setLoading={handleLoading}
              />
              <View style={styles.secondButtonContainer}>
                <LinkButton
                  colorOption={LinkButtonColors.GREEN}
                  title={t('screens.kyc.sworn-statement.example')}
                  onPress={handleShowExample}
                  pressed={false}
                />
              </View>
            </View>
          )}
          {docPickerVisible && (
            <View style={[styles.buttonContainer]}>
              <DocumentScanner
                getScan={handleGetDocument}
                handleError={handleError}
                setLoading={handleLoading}
              />
              <View style={styles.secondButtonContainer}>
                <DocumentPicker
                  getDocument={handleGetDocument}
                  handleError={handleError}
                  setLoading={handleLoading}
                />
              </View>
            </View>
          )}
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 32,
  },
  takePhoto: {
    fontSize: 16,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 7,
    marginLeft: 6,
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: '30%',
  },
  secondButtonContainer: {
    marginTop: 40,
  },
  iconContainer: { position: 'relative', left: 10, top: 2 },
});
