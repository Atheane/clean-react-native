import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { DocumentPickerResponse } from 'react-native-document-picker';

import {
  Colors,
  DocumentPicker,
  DocumentScanner,
  LinkButton,
  LinkButtonColors,
  SecondaryButton,
} from '@clean-rn/ui-mobile';
import { IDocumentType } from '@clean-rn/kyc/domain';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import {
  IDCardRecto,
  IDCardVerso,
  Passport,
  ResidencePermitRecto,
  ResidencePermitVerso,
  DrivingLicenseRecto,
  DrivingLicenseVerso,
  Iban,
  HealthThumb,
  HealthCard,
  Taxes,
  BillEdf,
  W9,
  SwornStatement,
} from '../assets/images';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

const HEIGHT = Dimensions.get('window').height;

export const UploadDocument = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const {
    params: { docType, step },
  } = useRoute() as { params: { docType: IDocumentType; step: number } };

  const [imageSource, setImageSource] = useState<ImageSourcePropType>(IDCardRecto);
  const [instruction, setInstruction] = useState('');
  const [anotherInstruction, setAnotherInstruction] = useState('');

  const [docPickerVisible, setDocPickerVisible] = useState(false);
  const [secondImageVisible, setSecondImageVisible] = useState(false);
  const [showExample, setShowExample] = useState(false);

  useEffect(() => {
    if (docType === IDocumentType.ID && step === 1) {
      setImageSource(IDCardRecto);
      setInstruction(t('screens.kyc.id.recto.instruction'));
      setAnotherInstruction('');
      setDocPickerVisible(false);
      setSecondImageVisible(false);
      setShowExample(false);
    } else if (docType === IDocumentType.ID && step === 2) {
      setImageSource(IDCardVerso);
      setInstruction(t('screens.kyc.id.verso.instruction'));
      setAnotherInstruction('');
      setDocPickerVisible(false);
      setSecondImageVisible(false);
      setShowExample(false);
    } else if (docType === IDocumentType.PASSPORT && step === 1) {
      setImageSource(Passport);
      setInstruction(t('screens.kyc.passport.instruction'));
      setAnotherInstruction('');
      setDocPickerVisible(false);
      setSecondImageVisible(false);
      setShowExample(false);
    } else if (docType === IDocumentType.RESIDENT_PERMIT && step === 1) {
      setImageSource(ResidencePermitRecto);
      setInstruction(t('screens.kyc.residence-permit.recto.instruction'));
      setAnotherInstruction('');
      setDocPickerVisible(false);
      setSecondImageVisible(false);
      setShowExample(false);
    } else if (docType === IDocumentType.RESIDENT_PERMIT && step === 2) {
      setImageSource(ResidencePermitVerso);
      setInstruction(t('screens.kyc.residence-permit.verso.instruction'));
      setAnotherInstruction('');
      setDocPickerVisible(false);
      setSecondImageVisible(false);
      setShowExample(false);
    } else if (docType === IDocumentType.DRIVING_LICENSE && step === 1) {
      setImageSource(DrivingLicenseRecto);
      setInstruction(t('screens.kyc.driving-license.recto.instruction'));
      setAnotherInstruction('');
      setDocPickerVisible(false);
      setSecondImageVisible(false);
      setShowExample(false);
    } else if (docType === IDocumentType.DRIVING_LICENSE && step === 2) {
      setImageSource(DrivingLicenseVerso);
      setInstruction(t('screens.kyc.driving-license.verso.instruction'));
      setAnotherInstruction('');
      setDocPickerVisible(false);
      setSecondImageVisible(false);
      setShowExample(false);
    } else if (docType === IDocumentType.HEALTH_INSURANCE_CARD && step === 1) {
      setImageSource(HealthThumb);
      setInstruction(t('screens.kyc.health-card.instruction'));
      setAnotherInstruction('');
      setDocPickerVisible(false);
      setSecondImageVisible(true);
      setShowExample(false);
    } else if (docType === IDocumentType.BANK_ID && step === 1) {
      setImageSource(Iban);
      setInstruction(t('screens.kyc.iban.instruction'));
      setAnotherInstruction('');
      setDocPickerVisible(true);
      setSecondImageVisible(false);
      setShowExample(false);
    } else if (docType === IDocumentType.TAX_STATEMENT && step === 1) {
      setImageSource(Taxes);
      setInstruction(t('screens.kyc.taxes.instruction'));
      setAnotherInstruction('');
      setDocPickerVisible(true);
      setSecondImageVisible(false);
      setShowExample(false);
    } else if (docType === IDocumentType.INVOICE && step === 1) {
      setImageSource(BillEdf);
      setInstruction(t('screens.kyc.invoice.instruction'));
      setAnotherInstruction(t('screens.kyc.invoice.another-instruction'));
      setDocPickerVisible(true);
      setSecondImageVisible(false);
      setShowExample(false);
    } else if (docType === IDocumentType.TAX_CERTIFICATE && step === 1) {
      setImageSource(W9);
      setInstruction(t('screens.kyc.w9.instruction'));
      setAnotherInstruction('');
      setDocPickerVisible(true);
      setSecondImageVisible(false);
      setShowExample(false);
    } else if (docType === IDocumentType.SWORN_STATEMENT && step === 1) {
      setImageSource(SwornStatement);
      setInstruction(t('screens.kyc.sworn-statement.instruction'));
      setAnotherInstruction('');
      setDocPickerVisible(false);
      setSecondImageVisible(false);
      setShowExample(true);
    }
  }, [docType, step, t]);

  const dispatch = useDispatch();

  const handleError = useCallback(
    (error: unknown) => {
      dispatch(showUnknownError(error as Error));
    },
    [dispatch],
  );

  const handleGetDocument = useCallback((docBase64: string) => {
    console.log(docBase64);
    //todo dispatch to upload document usecase
  }, []);

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
