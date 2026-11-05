export enum IUserSearchServerCode {
  NOT_FOUND = 4100690, // User has not been found anywhere
  EMAIL_EXISTS = 40133439, // User email exists
  ENERGY_APP_USER = 87300973, // User is registered both in EnergyApp and BANK
  KELVIN_USER = 102003790, // User exists only on old database
  KELVIN_USER_SCAM = 401,
  PHONE_EXISTS = 60067008, // User email is unknown but phone number already exists
  KYC_PROVIDER_USER = 500,
}
