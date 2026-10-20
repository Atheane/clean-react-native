import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import Markdown from 'react-native-markdown-package';

import { DocumentScanner, Colors, FontNames } from '@clean-rn/ui-mobile';
import { IDocumentType } from '@clean-rn/kyc/domain';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IDCardRecto, IDCardVerso } from '../assets/images';
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
          {/* <Text style={[theme.bank.text.darkBlue, styles.title]}> */}
          {/* <Markdown style={styles.md}>{`${t('screens.kyc.id.instruction-part-one')} **${t(
            'screens.kyc.id.recto',
          )}** ${t('screens.kyc.id.instruction-part-two')}`}</Markdown> */}
          {/* </Text> */}
          <Markdown styles={styles.singleLineMd}>{`${t('screens.kyc.id.instruction-part-one')} **${t(
            'screens.kyc.id.recto',
          )}** ${t('screens.kyc.id.instruction-part-two')}`}</Markdown>
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
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 0,
  },
  iconContainer: { position: 'relative', left: 10, top: 2 },
  singleLineMd: {
    text: {
      color: Colors.bank.primary.darkBlue,
      fontSize: 16,
      textAlign: 'center',
      fontFamily: FontNames.MartelSans_400Regular,
      lineHeight: 22,
    },
    view: {
      // alignSelf: 'stretch',
    },
  },
});
