import { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { domainEventManager } from '@clean-rn/ddd';
import { KYC_EVENTS } from '@clean-rn/kyc/domain';

import { IDomainError } from '@clean-rn/ddd';
import { IDocumentErrorMessage, IDocumentErrorCodes, Customer } from '@clean-rn/kyc/domain';

import {
  DocumentScanner,
  LinkButton,
  LinkButtonColors,
  LoaderSplashScreen,
  DocumentPicker,
} from '@clean-rn/ui-mobile';

import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { ErrorMessage } from '../../../shared/presentation/components/error-message';

import { addPage } from '../../application/commands';
import {
  IKycStackPages,
  IRootStackParamList,
  ISharedStackParamList,
} from '../../../shared/presentation/types';

const HEIGHT = Dimensions.get('window').height;

type NavigationProp = NativeStackNavigationProp<IRootStackParamList & ISharedStackParamList>;

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

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const unsubscribe = domainEventManager.on(KYC_EVENTS.DOCUMENT_PAGE_ADDED, (customer: Customer) => {
      setLoading(false);
      const currentDocument = customer.properties.currentDocument;
      const isDocumentReady = currentDocument?.isReady || false;
      if (isDocumentReady) {
        navigation.navigate(IKycStackPages.KYC);
      } else {
        setLoading(false);
        navigation.navigate(IKycStackPages.UPLOAD_DOCUMENT, nextRouteParams);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [nextRouteParams, navigation]);

  const handleGetDocument = useCallback(
    (docBase64: string) => {
      setLoading(true);
      dispatch(addPage({ base64: docBase64 }));
    },
    [dispatch],
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
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={[styles.instructionText]}>
            <Text style={[theme.text.darkBlue, styles.takePhoto]}>{t('screens.kyc.take-photo')}</Text>
            <Text style={[theme.text.boldDarkBlue, styles.instruction]}>{instruction}</Text>
            <Text style={[theme.text.darkBlue, styles.instruction]}>{anotherInstruction}</Text>
            <Text style={[theme.text.boldDarkBlue, styles.instruction]}>{lastInstruction}</Text>
          </View>
          <Image source={imageSource} />
          {domainError && (
            <ErrorMessage
              error={domainError}
              errorMessage={t(`errors.domain-error.kyc.${domainError.code}`)}
              genericErrorMessage={t('errors.other')}
            />
          )}

          {!docPickerVisible && !showExample && (
            <View style={styles.buttonContainer}>
              <DocumentScanner
                getScan={handleGetDocument}
                handleError={handleError}
                setLoading={handleLoading}
                buttonTitle={t('button.photo')}
              />
            </View>
          )}
          {!docPickerVisible && showExample && (
            <View style={styles.buttonContainer}>
              <DocumentScanner
                getScan={handleGetDocument}
                handleError={handleError}
                setLoading={handleLoading}
                buttonTitle={t('button.photo')}
              />
              <View style={styles.secondButtonContainer}>
                <LinkButton
                  colorOption={LinkButtonColors.GREEN}
                  title={t('screens.kyc.sworn-statement.example')}
                  onPress={handleShowExample}
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
                buttonTitle={t('button.photo')}
              />
              <View style={styles.secondButtonContainer}>
                <DocumentPicker
                  getDocument={handleGetDocument}
                  handleError={handleError}
                  setLoading={handleLoading}
                  buttonTitle={t('button.document')}
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
    height: HEIGHT,
    marginTop: 30,
  },
  instructionText: {
    width: '90%',
    marginBottom: 30,
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
    marginTop: 20,
    marginBottom: '40%',
  },
  secondButtonContainer: {
    marginTop: 20,
  },
  iconContainer: { position: 'relative', left: 10, top: 2 },
});
