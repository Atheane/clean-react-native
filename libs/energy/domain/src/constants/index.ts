import { IWorks } from '../types';

// decay hyp given by "perplexity.ai"
export const DECAY_CONSUMPTIONS_AFTER_WORKS = {
  [IWorks.ISOLATION_ANTICS]: 0.3,
  [IWorks.HEAT_PUMP]: 0.6,
  [IWorks.ISOLATION_WINDOWS]: 0.125,
  [IWorks.GLOBAL_RENOVATION]: 0.7,
};

export const HEATING_DAYS_IN_A_YEAR = 235;
export const COOLING_DAYS_IN_A_YEAR = 15;
