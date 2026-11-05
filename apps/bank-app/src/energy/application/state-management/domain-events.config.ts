import { ENERGY_EVENTS } from '@clean-rn/energy/domain';
import { IEnergyTypes } from '../commands';

export const energyDomainEventsConfig = {
  energy: [
    {
      eventName: ENERGY_EVENTS.ENERGY_CREATED,
      actionType: IEnergyTypes.ENERGY_DOMAIN_EVENT,
    },
    {
      eventName: ENERGY_EVENTS.SENSORS_CHECKED,
      actionType: IEnergyTypes.ENERGY_DOMAIN_EVENT,
    },
    {
      eventName: ENERGY_EVENTS.TEMPERATURE_ADDED,
      actionType: IEnergyTypes.ENERGY_DOMAIN_EVENT,
    },
    {
      eventName: ENERGY_EVENTS.HUMIDITY_ADDED,
      actionType: IEnergyTypes.ENERGY_DOMAIN_EVENT,
    },
    {
      eventName: ENERGY_EVENTS.CO2_ADDED,
      actionType: IEnergyTypes.ENERGY_DOMAIN_EVENT,
    },
    {
      eventName: ENERGY_EVENTS.PRICES_COMFORT_ADDED,
      actionType: IEnergyTypes.ENERGY_DOMAIN_EVENT,
    },
    {
      eventName: ENERGY_EVENTS.TOTAL_REWARDS_SET,
      actionType: IEnergyTypes.ENERGY_DOMAIN_EVENT,
    },
    {
      eventName: ENERGY_EVENTS.CURRENT_QUIZ_SET,
      actionType: IEnergyTypes.ENERGY_DOMAIN_EVENT,
    },
  ],
};
