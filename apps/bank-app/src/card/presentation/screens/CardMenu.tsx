import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';

import {
  ContactEmail,
  LinkButton,
  LinkButtonColors,
  LoaderSplashScreen,
  SpeedLimit,
  Lock,
  Unlock,
  ChangePin,
  ShowPin,
  Colors,
} from '@clean-rn/ui-mobile';
import { CardError, ICardStatuses } from '@clean-rn/card/domain';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { ICardStackPages } from '../../../shared/presentation/types';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { CB } from '../assets/images';

const HEIGHT = Dimensions.get('screen').height;
export const CardMenu = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const { pending, card, error } = useSelector((state: IRootState) => state.card);

  return pending ? (
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={CB} style={{ width: 150, height: 300 }} />
          </View>
          {error && error instanceof CardError.Forbidden && (
            <View style={styles.contactEmailContainer}>
              <Text style={[styles.instruction, theme.text.grey, { fontSize: 14, textAlign: 'center' }]}>
                {t('screens.card.menu.unavailable-card')}
              </Text>
              <ContactEmail
                subject={t('contact-email.subject.unavailable-card')}
                body={t('contact-email.body.unavailable-card')}
                label={t('contact-email.label')}
                co2={t('contact-email.co2')}
              />
            </View>
          )}
          <View style={[styles.subContainer]}>
            <View style={styles.rowContainer}>
              <LinkButton
                iconLeft={() => (
                  <SpeedLimit
                    width={styles.icon.width}
                    height={styles.icon.height}
                    style={{ marginRight: 16 }}
                    startColor={Colors.secondary.pink}
                    endColor={Colors.primary.darkBlue}
                  />
                )}
                colorOption={LinkButtonColors.BLUE}
                title={t('screens.card.menu.limits')}
                onPress={() => navigation.navigate(ICardStackPages.CARD_LIMITS as never)}
                disabled={
                  (error && error instanceof CardError.Forbidden) ||
                  ((card && card.properties.status === ICardStatuses.LOCK) as boolean)
                }
              />
            </View>
            <View style={styles.rowContainer}>
              <LinkButton
                iconLeft={
                  card?.properties.status === ICardStatuses.LOCK
                    ? () => (
                        <Unlock
                          width={styles.icon.width}
                          height={styles.icon.height}
                          style={{ marginRight: 16 }}
                        />
                      )
                    : () => (
                        <Lock
                          width={styles.icon.width}
                          height={styles.icon.height}
                          style={{ marginRight: 16 }}
                          startColor={Colors.secondary.pink}
                          endColor={Colors.primary.darkBlue}
                        />
                      )
                }
                colorOption={LinkButtonColors.BLUE}
                title={
                  card?.properties.status === ICardStatuses.LOCK
                    ? t('screens.card.menu.unlock')
                    : t('screens.card.menu.lock')
                }
                onPress={() => navigation.navigate(ICardStackPages.LOCK_CARD as never)}
                disabled={(error && error instanceof CardError.Forbidden) as boolean}
              />
            </View>
            <View style={[styles.rowContainer, { marginLeft: 4 }]}>
              <LinkButton
                iconLeft={() => (
                  <ChangePin
                    width={styles.icon.width}
                    height={styles.icon.height}
                    style={{ marginRight: 12 }}
                    startColor={Colors.secondary.pink}
                    endColor={Colors.primary.darkBlue}
                  />
                )}
                colorOption={LinkButtonColors.BLUE}
                title={t('screens.card.menu.change-pin')}
                onPress={() => navigation.navigate(ICardStackPages.CHANGE_PIN as never)}
                disabled={
                  (error && error instanceof CardError.Forbidden) ||
                  ((card && card.properties.status === ICardStatuses.LOCK) as boolean)
                }
              />
            </View>
            <View style={[styles.rowContainer, { marginLeft: 2 }]}>
              <LinkButton
                iconLeft={() => (
                  <ShowPin
                    width={styles.icon.width}
                    height={styles.icon.height}
                    startColor={Colors.secondary.pink}
                    endColor={Colors.primary.darkBlue}
                    style={{ marginRight: 14 }}
                  />
                )}
                colorOption={LinkButtonColors.BLUE}
                title={t('screens.card.menu.show-pin')}
                onPress={() => navigation.navigate(ICardStackPages.SHOW_PIN as never)}
                disabled={
                  (error && error instanceof CardError.Forbidden) ||
                  ((card && card.properties.status === ICardStatuses.LOCK) as boolean)
                }
              />
            </View>
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
    justifyContent: 'center',
  },
  icon: {
    width: 27,
    height: 27,
  },
  imageContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    marginLeft: 32,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  contactEmailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  instruction: {
    textAlign: 'center',
    width: '85%',
    marginVertical: 24,
  },
});
