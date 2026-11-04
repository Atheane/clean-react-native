import { Middleware } from 'redux';
import { domainEventManager } from '@clean-rn/ddd';
import { Entity } from '@clean-rn/ddd';
import { IAuthTypes } from '../../../../auth/application/commands';

// Generic type for the configurations of events by bounded context
type DomainEventConfig = {
  eventName: string;
  actionType: string;
};

// Configuration of events by bounded context
export const createDomainEventsMiddleware =
  (boundedContextConfigs: Record<string, DomainEventConfig[]>): Middleware =>
  (store) => {
    const subscriptions = new Map<string, () => void>();
    // keep a reference of the last processed event
    const lastProcessedEvent = {
      id: '',
      timestamp: 0,
    };

    const setupBoundedContextSubscriptions = (contextName: string, configs: DomainEventConfig[]) => {
      configs.forEach(({ eventName, actionType }) => {
        const unsubscribe = domainEventManager.on(eventName, (data: Entity<any>) => {
          // Create a unique identifier for this event
          const currentEventId = `${eventName}-${data?.id || ''}`;
          const currentTimestamp = Date.now();

          // Ignore if the same event in an interval of 100ms
          // it might happen with very bad internet connection
          if (
            currentEventId === lastProcessedEvent.id &&
            currentTimestamp - lastProcessedEvent.timestamp < 100
          ) {
            return;
          }

          // Update the reference
          lastProcessedEvent.id = currentEventId;
          lastProcessedEvent.timestamp = currentTimestamp;

          store.dispatch({
            type: actionType,
            payload: { [contextName]: data },
          });
        });

        subscriptions.set(`${contextName}:${eventName}`, unsubscribe);
      });
    };

    // Initialization of subscriptions for each bounded context
    Object.entries(boundedContextConfigs).forEach(([contextName, configs]) => {
      setupBoundedContextSubscriptions(contextName, configs);
    });

    const cleanup = () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      subscriptions.clear();
      lastProcessedEvent.id = '';
      lastProcessedEvent.timestamp = 0;
    };

    return (next) => (action) => {
      if (action.type === IAuthTypes.LOGGED_OUT) {
        cleanup();
      }
      return next(action);
    };
  };
