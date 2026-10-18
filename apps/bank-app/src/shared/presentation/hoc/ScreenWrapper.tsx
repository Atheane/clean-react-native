import { SafeAreaView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Logger } from '@clean-rn/logger';
import { Banner, BannerColors, Colors } from '@clean-rn/ui-mobile';

type IProps = {
  children: React.ReactElement;
};

export const ScreenWrapper = ({ children }: IProps) => {
  const { t } = useTranslation();
  try {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>{children}</KeyboardAwareScrollView>
      </SafeAreaView>
    );
  } catch (e: unknown) {
    let errorMessage = t('errors.unknown');
    if (e instanceof Error) {
      Logger.getInstance().error(e.message);
      errorMessage = e.message + t('errors.contact-admin');
    }
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>', errorMessage);
    return (
      <SafeAreaView style={styles.container}>
        <Banner title={errorMessage} colorBanner={BannerColors.PINK} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>{children}</KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.white,
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButton: {
    marginTop: 8,
  },
  cgu: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
