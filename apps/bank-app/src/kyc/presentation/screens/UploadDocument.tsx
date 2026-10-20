import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { DocumentScanner } from '@clean-rn/ui-mobile';
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
  W9,
} from '../assets/images';
import { useDispatch } from 'react-redux';
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
  const [healthCardVisible, setHealthCardVisible] = useState(false);

  useEffect(() => {
    if (docType === IDocumentType.ID && step === 1) {
      setImageSource(IDCardRecto);
      setInstruction(t('screens.kyc.id.recto.instruction'));
    } else if (docType === IDocumentType.ID && step === 2) {
      setImageSource(IDCardVerso);
      setInstruction(t('screens.kyc.id.verso.instruction'));
    } else if (docType === IDocumentType.PASSPORT && step === 1) {
      setImageSource(Passport);
      setInstruction(t('screens.kyc.passport.instruction'));
    } else if (docType === IDocumentType.RESIDENT_PERMIT && step === 1) {
      setImageSource(ResidencePermitRecto);
      setInstruction(t('screens.kyc.residence-permit.recto.instruction'));
    } else if (docType === IDocumentType.RESIDENT_PERMIT && step === 2) {
      setImageSource(ResidencePermitVerso);
      setInstruction(t('screens.kyc.residence-permit.verso.instruction'));
    } else if (docType === IDocumentType.DRIVING_LICENSE && step === 1) {
      setImageSource(DrivingLicenseRecto);
      setInstruction(t('screens.kyc.driving-license.recto.instruction'));
    } else if (docType === IDocumentType.DRIVING_LICENSE && step === 2) {
      setImageSource(DrivingLicenseVerso);
      setInstruction(t('screens.kyc.driving-license.verso.instruction'));
    } else if (docType === IDocumentType.HEALTH_INSURANCE_CARD && step === 1) {
      setImageSource(HealthThumb);
      setInstruction(t('screens.kyc.health-card.instruction'));
    } else if (docType === IDocumentType.BANK_ID && step === 1) {
      setImageSource(Iban);
      setInstruction(t('screens.kyc.iban.instruction'));
    } else if (docType === IDocumentType.TAX_STATEMENT && step === 1) {
      setImageSource(Taxes);
      setInstruction(t('screens.kyc.taxes.instruction'));
    } else if (docType === IDocumentType.PROOF_OF_ADDRESS && step === 1) {
      setImageSource(ResidenceProof);
      setInstruction(t('screens.kyc.residence-proof.instruction'));
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

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View>
            <Text style={[theme.bank.text.darkBlue, styles.takePhoto]}>{t('screens.kyc.take-photo')}</Text>
            <Text style={[theme.bank.text.boldDarkBlue, styles.instruction]}>{instruction}</Text>
          </View>
          <Image source={imageSource} style={{ width: 180 }} />
          <View style={styles.buttonContainer}>
            <DocumentScanner getScan={handleGetScan} handleError={handleError} />
            {docPickerVisible}
          </View>
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
    marginBottom: '30%',
  },
  iconContainer: { position: 'relative', left: 10, top: 2 },
});
