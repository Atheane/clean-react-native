import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { DocumentPicker, DocumentScanner, LinkButton, LinkButtonColors } from '@clean-rn/ui-mobile';

import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { addPage } from '../../application/commands/document';

import { HealthCard } from '../assets/images';

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
      secondImageVisible,
      showExample,
      nextRouteParams,
    },
  } = useRoute() as {
    params: {
      instruction: string;
      imageSource: ImageSourcePropType;
      anotherInstruction?: string;
      docPickerVisible?: boolean;
      secondImageVisible?: boolean;
      showExample?: boolean;
      nextRouteParams?: {
        instruction: string;
        imageSource: ImageSourcePropType;
        anotherInstruction?: string;
        docPickerVisible?: boolean;
        secondImageVisible?: boolean;
        showExample?: boolean;
      };
    };
  };

  const dispatch = useDispatch();

  const handleError = useCallback(
    (error: unknown) => {
      dispatch(showUnknownError(error as Error));
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

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View>
            <Text style={[theme.bank.text.darkBlue, styles.takePhoto]}>{t('screens.kyc.take-photo')}</Text>
            <Text style={[theme.bank.text.boldDarkBlue, styles.instruction]}>{instruction}</Text>
            <Text style={[theme.bank.text.darkBlue, styles.instruction]}>{anotherInstruction}</Text>
          </View>
          <Image source={imageSource} />
          {secondImageVisible && (
            <>
              <Text style={[theme.bank.text.darkBlue, styles.takePhoto]}>
                {t('screens.kyc.health-card.or')}
              </Text>
              <Image source={HealthCard} />
            </>
          )}
          {!docPickerVisible && !showExample && (
            <View style={styles.buttonContainer}>
              <DocumentScanner getScan={handleGetDocument} handleError={handleError} />
            </View>
          )}
          {!docPickerVisible && showExample && (
            <View style={styles.buttonContainer}>
              <DocumentScanner getScan={handleGetDocument} handleError={handleError} />
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
            <View style={styles.buttonContainer}>
              <DocumentScanner getScan={handleGetDocument} handleError={handleError} />
              <View style={styles.secondButtonContainer}>
                <DocumentPicker getDocument={handleGetDocument} handleError={handleError} />
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
    marginTop: 24,
  },
  iconContainer: { position: 'relative', left: 10, top: 2 },
});
