export type IDomainEventConfig = {
  [contextName: string]: {
    eventName: string;
    actionType: string;
  }[];
};
