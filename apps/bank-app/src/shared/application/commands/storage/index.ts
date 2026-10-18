import { Email } from '@clean-rn/auth/domain';

export enum IStorageTypes {
  ASK_LOAD_STORAGE = 'ASK_LOAD_STORAGE',
  LOAD_STORAGE_SUCCESS = 'LOAD_STORAGE_SUCCESS', //todo => should be a DomainEvent STORAGE_LOADED
  STORE_TOKEN = 'STORE_TOKEN',
  STORE_EMAIL = 'STORE_EMAIL',
  STORE_SIGNUP_STEP = 'STORE_SIGNUP_STEP',
}

export type ILoadStorageSuccessPayload = {
  token: string | null;
  email: Email | null;
  signupStep: string | null;
  houseEmissions: number | null;
  averageHouseEmissions: number | null;
  foodEmissions: number | null;
  averageFoodEmissions: number | null;
  transportEmissions: number | null;
  averageTransportEmissions: number | null;
  flyEmissions: number | null;
  averageFlyEmissions: number | null;
};

type IAskLoadStorage = {
  type: typeof IStorageTypes.ASK_LOAD_STORAGE;
};

type ILoadStorageSuccess = {
  type: typeof IStorageTypes.LOAD_STORAGE_SUCCESS;
  payload: ILoadStorageSuccessPayload;
};

type IStoreToken = {
  type: typeof IStorageTypes.STORE_TOKEN;
  payload: string;
};

type IStoreEmail = {
  type: typeof IStorageTypes.STORE_EMAIL;
  payload: Email;
};

type IStoreSignupStepSuccess = {
  type: typeof IStorageTypes.STORE_SIGNUP_STEP;
  payload: number;
};

export type IStorageActions =
  | IAskLoadStorage
  | ILoadStorageSuccess
  | IStoreToken
  | IStoreEmail
  | IStoreSignupStepSuccess;

export const askLoadStorage = (): IAskLoadStorage => ({
  type: IStorageTypes.ASK_LOAD_STORAGE,
});

export const loadStorageSuccess = (payload: ILoadStorageSuccessPayload): ILoadStorageSuccess => ({
  type: IStorageTypes.LOAD_STORAGE_SUCCESS,
  payload,
}); //todo should be a DomainEvent STORAGE_LOADED

export const storeToken = (payload: string): IStoreToken => ({
  type: IStorageTypes.STORE_TOKEN,
  payload,
});

export const storeEmail = (payload: Email): IStoreEmail => ({
  type: IStorageTypes.STORE_EMAIL,
  payload,
});

export const storeSignupStep = (payload: number): IStoreSignupStepSuccess => ({
  type: IStorageTypes.STORE_SIGNUP_STEP,
  payload,
});
