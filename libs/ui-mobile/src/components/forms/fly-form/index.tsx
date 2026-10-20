import { useCallback, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '@rneui/themed';

import { FlightSeatE as SeatE, FlightI } from '@bank/carbon-weight/dist';

import { Logger } from '@clean-rn/logger';
import { FlyEmissions } from '@clean-rn/carbon/domain';

import { FlyFrom, FlyTo, PlaneEmpty } from '../../../assets';
import { Colors } from '../../../constants';

import { SecondaryButton } from '../../buttons/secondary-button';
import { SwitchButton } from '../../buttons/switch-button';
import { CardScroller, ICardType } from '../../cards/card-scroller';
import { SelectNumber } from '../../inputs/select-number';
import { SearchModal } from '../../searchboxes/search-modal';

enum FLY_TYPE {
  SIMPLE = 'simple',
  ROUND = 'round',
}

const FlyTypeComparator = {
  [FLY_TYPE.SIMPLE]: false,
  [FLY_TYPE.ROUND]: true,
};

type IData = {
  key: string;
  value: string;
};
type IProps = {
  airports: { key: string; value: string }[];
  flight: Partial<FlightI>;
  flights: FlightI[];
  onChangeField: (key: keyof FlightI, value: number | string | boolean) => void;
  onAddFlight: () => void;
  onRemoveFlight: (uid: string) => void;
  scrollViewRef: React.RefObject<KeyboardAwareScrollView>;
};

const COEFF = 0.75;

export const FlyForm = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    try {
      new FlyEmissions(props.flight as FlightI);
      setDisabled(false);
    } catch (e: unknown) {
      Logger.getInstance().info(e);
    }
  }, [props.flight]);

  const handleOnChangeField = useCallback(
    (item: IData, property: keyof FlightI) => {
      props.onChangeField(property, item.key);
    },
    [props],
  );

  const handleOnChangeFlightNumber = useCallback(
    (value: number) => {
      props.onChangeField('nbPassengers', value);
    },
    [props],
  );

  const handleOnToggleWays = useCallback(
    ({ key }: { key: string }) => {
      props.onChangeField('roundTrip', FlyTypeComparator[key as FLY_TYPE]);
    },
    [props],
  );

  const handleOnToggleSeat = useCallback(
    ({ key }: { key: string }) => {
      props.onChangeField('seatType', SeatE[key as SeatE]);
    },
    [props],
  );

  const mapFlightToCards = (flights: FlightI[]) => {
    if (!flights || flights.length === 0) {
      return [];
    }
    return flights
      .map(({ nbPassengers, fromIATA, toIATA, seatType, roundTrip }: FlightI) => {
        const plural = nbPassengers > 1 ? 's' : '';
        const travelType = (
          roundTrip ? t('screens.carbon-fly.swipe-button.round') : t('screens.carbon-fly.swipe-button.simple')
        ).toLocaleLowerCase();
        const seat = (
          seatType === SeatE.economy
            ? t('screens.carbon-fly.swipe-button.economy')
            : t('screens.carbon-fly.swipe-button.business')
        ).toLocaleLowerCase();

        return {
          uid: `${nbPassengers}_${fromIATA}_${toIATA}_${seatType}_${roundTrip}`,
          text: `${nbPassengers} ${travelType}${plural} ${fromIATA} / ${toIATA} ${seat}`,
          icon: PlaneEmpty,
        };
      })
      .filter((value, index, self) => {
        return self.findIndex((v) => v.uid === value.uid) === index;
      });
  };

  const handleOnDeleteFlight = (uid: string) => {
    if (props.onRemoveFlight) props.onRemoveFlight(uid);
  };

  const cardScrollRef = useRef<null | ScrollView>(null);

  const handleOnAddFlight = () => {
    props.onAddFlight();
    props.scrollViewRef.current?.scrollToEnd();
    cardScrollRef.current?.scrollToEnd();
  };

  return (
    <View style={theme.bank.container.centeredItem}>
      <View style={styles.inputContainer}>
        <SearchModal
          label={t('screens.carbon-fly.dropdown.destination')}
          placeholder={t('screens.carbon-fly.dropdown.destination')}
          data={props.airports}
          icon={() => <FlyFrom style={{ color: Colors.bank.primary.lightGreen }} />}
          onSelect={(data: IData) => handleOnChangeField(data, 'fromIATA')}
        />
      </View>
      <View style={styles.inputContainer}>
        <SearchModal
          label={t('screens.carbon-fly.dropdown.arrival')}
          placeholder={t('screens.carbon-fly.dropdown.arrival')}
          data={props.airports}
          icon={() => <FlyTo style={{ color: Colors.bank.primary.lightGreen }} />}
          onSelect={(data: IData) => handleOnChangeField(data, 'toIATA')}
        />
      </View>
      <View
        style={[
          styles.sliderContainer,
          styles.inputContainer,
          { width: Dimensions.get('window').width * COEFF },
        ]}
      >
        <SelectNumber
          label={t('screens.carbon-fly.slider')}
          value={props.flight?.nbPassengers ?? 1}
          onChange={handleOnChangeFlightNumber}
        />
      </View>
      <View style={[styles.swipeButtonContainer, styles.inputContainer]}>
        <SwitchButton
          label={t('screens.carbon-fly.swipe-button.type')}
          options={[
            { key: FLY_TYPE.SIMPLE, value: t('screens.carbon-fly.swipe-button.simple') },
            { key: FLY_TYPE.ROUND, value: t('screens.carbon-fly.swipe-button.round') },
          ]}
          onToggle={handleOnToggleWays}
        />
      </View>
      <View style={[styles.swipeButtonContainer, styles.inputContainer]}>
        <SwitchButton
          label={t('screens.carbon-fly.swipe-button.class')}
          options={[
            { key: SeatE.economy, value: t('screens.carbon-fly.swipe-button.economy') },
            { key: SeatE.business, value: t('screens.carbon-fly.swipe-button.business') },
          ]}
          onToggle={handleOnToggleSeat}
        />
      </View>
      <View style={styles.buttonContainer}>
        <SecondaryButton
          title={t('screens.carbon-fly.secondary-button')}
          onPress={handleOnAddFlight}
          disabled={disabled}
        />
      </View>
      {props.flights && props.flights.length > 0 && (
        <View style={styles.cardScroller}>
          <CardScroller
            data={mapFlightToCards(props.flights)}
            onDelete={handleOnDeleteFlight}
            height={260}
            cardScrollRef={cardScrollRef}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 60,
  },
  cardScroller: {
    marginTop: -20,
    marginBottom: 32,
  },
  sliderContainer: {
    marginHorizontal: 32,
    marginBottom: -32,
  },
  swipeButtonContainer: {
    marginHorizontal: 8,
    marginBottom: -16,
  },
  buttonContainer: {
    marginTop: 64,
    marginBottom: 16,
  },
});
