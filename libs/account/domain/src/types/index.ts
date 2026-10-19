export enum IAccountType {
  MAIN = 'main',
  RESTOFLASH = 'restoflash',
  WEFLO = 'weflo',
}

export enum ITransactionType {
  CARD_TRANSACTION = 'CARD_TRANSACTION',
  PAYIN = 'PAYIN',
  PAYOUT = 'PAYOUT',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
}

//todo need relevant categories in app from Gildas
export enum ITransactionCategory {
  BANK = 'BANK',
  BAR = 'BAR',
  ENDOWMENT = 'ENDOWMENT',
  ASSURANCES = 'ASSURANCES',
  LEISURE = 'LEISURE',
  ART = 'ART',
  LEGAL = 'LEGAL',
  PROCUREMENT = 'PROCUREMENT',
  HOUSING = 'HOUSING',
  TRANSPORT = 'TRANSPORT',
  HIGHT_TECH = 'HIGHT_TECH',
  SUBSCRIPTIONS = 'SUBSCRIPTIONS',
  TRAVEL = 'TRAVEL',
  VEHICLES = 'VEHICLES',
  ALCOHOL = 'ALCOHOL',
  HEALTH = 'HEALTH',
  SCHOOLING = 'SCHOOLING',
  RESTAURANTS = 'RESTAURANTS',
  DIVERSE = 'DIVERSE',
  FUEL = 'FUEL',
  NUTRITION = 'NUTRITION',
  NUMERIC = 'NUMERIC',
  CLOTHING = 'CLOTHING',
  CULTURE = 'CULTURE',
  NURSING = 'nursing',
  PRO = 'PRO',
}

export enum IStatementsPeriod {
  LAST_MONTH = 'month',
  LAST_TRIMESTER = 'trimester',
  ALL = 'all',
}
