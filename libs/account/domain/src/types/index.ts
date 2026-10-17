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
  BANK = 'bank',
  HOUSING = 'housing',
  NUTRITION = 'nutrition',
  TRANSPORT = 'transport',
  SUBSCRIPTIONS = 'subscriptions',
  DIVERSE = 'diverse',
  HIGHT_TECH = 'high-tech',
  LEISURE = 'leisure',
  PROCUREMENT = 'procurement',
  HEALTH = 'health',
  PRO = 'pro',
  NURSING = 'nursing',
  SCHOOLING = 'schooling',
}

//todo need relevant categories in app from Gildas
export enum ITransactionSubCategory {
  // nutrition
  RESTAURANTS = 'restaurants',
  BARS = 'bars',
  // transport
  FUEL = 'fuel',
  //subscriptions
  ASSURANCES = 'assurances',
  // diverse
  ENDOWMENT = 'endowment',
  // high-tech
  // leisure
  TRAVEL = 'travel',
  SPORT = 'sport',
  NUMERIC = 'numeric',
  // procurement
  VEHICLES = 'vehicles',
  CLOTHING = 'clothing',
  HOUSING = 'housing',
  ALCOHOL = 'alcohol',
  CULTURE = 'culture',
  ART = 'art',
  LEGAL = 'legal',
  // health
  NURSING = 'nursing',
  // pro
  // nursing
  // schooling
}
