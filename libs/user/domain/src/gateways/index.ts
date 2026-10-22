import { ISendPhoneValidationCommand } from '../commands';
import { ISearchEmailQuery, ISearchPhoneQuery, IValidatePhoneQuery } from '../queries';
import { ISuccess } from '../types';

export interface IUserGateway {
  searchEmail(query: ISearchEmailQuery): Promise<ISuccess>;
  searchPhone(query: ISearchPhoneQuery): Promise<ISuccess>;
  sendPhoneValidation: (cmd: ISendPhoneValidationCommand) => Promise<ISuccess>;
  checkPhoneValidation: (query: IValidatePhoneQuery) => Promise<ISuccess>;
}
