import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { IDocumentType } from '@clean-rn/kyc/domain';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IDCardRecto, IDCardVerso } from '../assets/images';
import { DocumentScanner } from '@clean-rn/ui-mobile';
import { useDispatch } from 'react-redux';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

const HEIGHT = Dimensions.get('window').height;

export const UploadPhoto = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const {
    params: { docType, step },
  } = useRoute() as { params: { docType: IDocumentType; step: number } };

  const [imageSource, setImageSource] = useState<ImageSourcePropType>(IDCardRecto);

  useEffect(() => {
    if (docType === IDocumentType.ID && step === 2) {
      setImageSource(IDCardVerso);
    }
  }, [docType, step]);

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
          <Text style={[theme.bank.text.boldDarkBlue, styles.title]}>{t('screens.kyc.id.instruction')}</Text>
          <Image source={imageSource} style={{ width: 180 }} />
          <View style={styles.buttonContainer}>
            <DocumentScanner getScan={handleGetScan} handleError={handleError} />
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
