import { useCallback, useEffect, useState } from 'react';
import { FlightI, FlightSeatE as SeatE } from '@bank/carbon-weight/dist';
import { Logger } from '@clean-rn/logger';
import { FlyEmissions } from '@clean-rn/carbon/domain';

export const useFlyFormData = () => {
  const [flight, setFlight] = useState<Partial<FlightI>>({
    nbPassengers: 1,
    roundTrip: false,
    seatType: SeatE.economy,
  });

  const [flights, setFlights] = useState<FlightI[]>([]);

  const handleChangeField = useCallback((key: keyof FlightI, value: number | string | boolean | SeatE) => {
    setFlight((flight: Partial<FlightI>) => ({ ...flight, [key]: value }));
  }, []);

  const handleOnAddFlight = useCallback(() => {
    try {
      new FlyEmissions(flight as FlightI);
      setFlights((flights: FlightI[]) => [...flights, flight as FlightI]);
    } catch (e: unknown) {
      Logger.getInstance().info(e);
    }
  }, [flight]);

  const handleRemoveFlight = useCallback((uid: string) => {
    const [nbPassengers, fromIATA, toIATA, seatType, roundTrip] = uid.split('_');
    setFlights((flights: FlightI[]) =>
      flights.filter(
        (flight: FlightI) =>
          flight.nbPassengers !== parseInt(nbPassengers) ||
          flight.fromIATA !== fromIATA ||
          flight.toIATA !== toIATA ||
          flight.seatType !== seatType ||
          flight.roundTrip !== (roundTrip === 'true'),
      ),
    );
  }, []);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (flights && flights.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [flights]);

  return { disabled, flight, flights, handleChangeField, handleOnAddFlight, handleRemoveFlight };
};
