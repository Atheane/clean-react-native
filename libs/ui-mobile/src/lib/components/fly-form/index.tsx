import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { FlightSeatE as SeatE, FlightI } from '@bank/carbon-weight/dist';

import { Logger } from '@clean-rn/ddd';
import { FlyEmissions } from '@clean-rn/carbon/domain';

import { FlyFrom, FlyTo, PlaneEmpty } from '../../assets';

import { SearchModal } from '../search-modal';
import { SecondaryButton } from '../secondary-button';
import { SelectNumber } from '../select-number';
import { SwitchButton } from '../switch-button';
import { CardScroller } from '../card-scroller';
import { Colors } from '../../constants';

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

export const FlyForm = (props: IProps) => {
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
    [props.onChangeField],
  );

  const handleOnChangeFlightNumber = useCallback(
    (value: number) => {
      props.onChangeField('nbPassengers', value);
    },
    [props.onChangeField],
  );

  const handleOnToggleWays = useCallback(
    ({ key }: { key: string }) => {
      props.onChangeField('roundTrip', FlyTypeComparator[key as FLY_TYPE]);
    },
    [props.onChangeField],
  );

  const handleOnToggleSeat = useCallback(
    ({ key }: { key: string }) => {
      props.onChangeField('seatType', SeatE[key as SeatE]);
    },
    [props.onChangeField],
  );

  const mapFlightToCards = (flights: FlightI[]) => {
    if (!flights || flights.length === 0) {
      return [];
    }
    return flights
      .map(({ nbPassengers, fromIATA, toIATA, seatType, roundTrip }: FlightI) => {
        const plural = nbPassengers > 1 ? 's' : '';
        const travelType = (
          roundTrip ? t('screens.carbonFly.swipeButton.round') : t('screens.carbonFly.swipeButton.simple')
        ).toLocaleLowerCase();
        const seat = (
          seatType ? t('screens.carbonFly.swipeButton.economy') : t('screens.carbonFly.swipeButton.business')
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

  const handleOnAddFlight = () => {
    props.onAddFlight();
    props.scrollViewRef.current?.scrollToEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <SearchModal
          label={t('screens.carbonFly.dropdown.destination')}
          placeholder={t('screens.carbonFly.dropdown.destination')}
          data={props.airports}
          icon={() => <FlyFrom style={{ color: Colors.icon.lightGreenTransparent }} />}
          onSelect={(data: IData) => handleOnChangeField(data, 'fromIATA')}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <SearchModal
          label={t('screens.carbonFly.dropdown.arrival')}
          placeholder={t('screens.carbonFly.dropdown.arrival')}
          data={props.airports}
          icon={() => <FlyTo style={{ color: Colors.icon.lightGreenTransparent }} />}
          onSelect={(data: IData) => handleOnChangeField(data, 'toIATA')}
        />
      </View>
      <View style={styles.sliderContainer}>
        <SelectNumber
          label={t('screens.carbonFly.slider')}
          value={props.flight?.nbPassengers ?? 1}
          onChange={handleOnChangeFlightNumber}
        />
      </View>
      <View style={styles.swipeButtonContainer}>
        <SwitchButton
          label={t('screens.carbonFly.swipeButton.type')}
          options={[
            { key: FLY_TYPE.SIMPLE, value: t('screens.carbonFly.swipeButton.simple') },
            { key: FLY_TYPE.ROUND, value: t('screens.carbonFly.swipeButton.round') },
          ]}
          onToggle={handleOnToggleWays}
        />
      </View>
      <View style={styles.swipeButtonContainer}>
        <SwitchButton
          label={t('screens.carbonFly.swipeButton.class')}
          options={[
            { key: SeatE.economy, value: t('screens.carbonFly.swipeButton.economy') },
            { key: SeatE.business, value: t('screens.carbonFly.swipeButton.business') },
          ]}
          onToggle={handleOnToggleSeat}
        />
      </View>
      <View style={styles.addButtonContainer}>
        <SecondaryButton
          title={t('screens.carbonFly.secondaryButton')}
          onPress={handleOnAddFlight}
          disabled={disabled}
        />
      </View>
      {props.flights && props.flights.length > 0 && (
        <View style={styles.cardScroller}>
          <CardScroller data={mapFlightToCards(props.flights)} onDelete={handleOnDeleteFlight} height={200} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardScroller: {
    marginBottom: 32,
  },
  dropdownContainer: {
    marginVertical: 16,
  },
  sliderContainer: {
    marginVertical: 16,
    marginHorizontal: 32,
  },
  swipeButtonContainer: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
  addButtonContainer: {
    marginVertical: 16,
  },
});
