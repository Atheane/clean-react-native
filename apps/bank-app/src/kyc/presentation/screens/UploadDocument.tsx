import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { DocumentPickerResponse } from 'react-native-document-picker';

import { DocumentPicker, DocumentScanner, KycInvoice } from '@clean-rn/ui-mobile';
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
  ResidenceProof,
  Taxes,
  BillEdf,
  W9,
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

  const [docPickerVisible, setDocPickerVisible] = useState(false);
  const [secondImageVisible, setSecondImageVisible] = useState(false);

  useEffect(() => {
    if (docType === IDocumentType.ID && step === 1) {
      setImageSource(IDCardRecto);
      setInstruction(t('screens.kyc.id.recto.instruction'));
      setDocPickerVisible(false);
      setSecondImageVisible(false);
    } else if (docType === IDocumentType.ID && step === 2) {
      setImageSource(IDCardVerso);
      setInstruction(t('screens.kyc.id.verso.instruction'));
      setDocPickerVisible(false);
      setSecondImageVisible(false);
    } else if (docType === IDocumentType.PASSPORT && step === 1) {
      setImageSource(Passport);
      setInstruction(t('screens.kyc.passport.instruction'));
      setDocPickerVisible(false);
      setSecondImageVisible(false);
    } else if (docType === IDocumentType.RESIDENT_PERMIT && step === 1) {
      setImageSource(ResidencePermitRecto);
      setInstruction(t('screens.kyc.residence-permit.recto.instruction'));
      setDocPickerVisible(false);
      setSecondImageVisible(false);
    } else if (docType === IDocumentType.RESIDENT_PERMIT && step === 2) {
      setImageSource(ResidencePermitVerso);
      setInstruction(t('screens.kyc.residence-permit.verso.instruction'));
      setDocPickerVisible(false);
      setSecondImageVisible(false);
    } else if (docType === IDocumentType.DRIVING_LICENSE && step === 1) {
      setImageSource(DrivingLicenseRecto);
      setInstruction(t('screens.kyc.driving-license.recto.instruction'));
      setDocPickerVisible(false);
      setSecondImageVisible(false);
    } else if (docType === IDocumentType.DRIVING_LICENSE && step === 2) {
      setImageSource(DrivingLicenseVerso);
      setInstruction(t('screens.kyc.driving-license.verso.instruction'));
      setDocPickerVisible(false);
      setSecondImageVisible(false);
    } else if (docType === IDocumentType.HEALTH_INSURANCE_CARD && step === 1) {
      setImageSource(HealthThumb);
      setInstruction(t('screens.kyc.health-card.instruction'));
      setDocPickerVisible(false);
      setSecondImageVisible(true);
    } else if (docType === IDocumentType.BANK_ID && step === 1) {
      setImageSource(Iban);
      setInstruction(t('screens.kyc.iban.instruction'));
      setDocPickerVisible(true);
      setSecondImageVisible(false);
    } else if (docType === IDocumentType.TAX_STATEMENT && step === 1) {
      setImageSource(Taxes);
      setInstruction(t('screens.kyc.taxes.instruction'));
      setDocPickerVisible(true);
      setSecondImageVisible(false);
    } else if (docType === IDocumentType.PROOF_OF_ADDRESS && step === 1) {
      setImageSource(ResidenceProof);
      setInstruction(t('screens.kyc.residence-proof.instruction'));
      setDocPickerVisible(true);
      setSecondImageVisible(false);
    } else if (docType === IDocumentType.INVOICE && step === 1) {
      setImageSource(BillEdf);
      setInstruction(t('screens.kyc.invoice.instruction'));
      setDocPickerVisible(true);
      setSecondImageVisible(false);
    } else if (docType === IDocumentType.TAX_CERTIFICATE && step === 1) {
      setImageSource(W9);
      setInstruction(t('screens.kyc.w9.instruction'));
      setDocPickerVisible(true);
      setSecondImageVisible(false);
    }
  }, [docType, step, t]);

  const dispatch = useDispatch();

  const handleError = useCallback(
    (error: unknown) => {
      dispatch(showUnknownError(error as Error));
    },
    [dispatch],
  );

  const handleGetScan = useCallback((scannedImg: string) => {
    console.log(scannedImg);
    //todo dispatch to upload document usecase
  }, []);

  const handleGetDocument = useCallback((doc: DocumentPickerResponse) => {
    console.log(doc);
    //todo dispatch to upload document usecase
  }, []);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View>
            <Text style={[theme.bank.text.darkBlue, styles.takePhoto]}>{t('screens.kyc.take-photo')}</Text>
            <Text style={[theme.bank.text.boldDarkBlue, styles.instruction]}>{instruction}</Text>
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
          {!docPickerVisible && (
            <View style={styles.buttonContainer}>
              <DocumentScanner getScan={handleGetScan} handleError={handleError} />
            </View>
          )}
          {docPickerVisible && (
            <View style={styles.buttonContainer}>
              <DocumentScanner getScan={handleGetScan} handleError={handleError} />
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
