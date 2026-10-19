import { IServerError } from '../types';

export class ServerError extends Error {
  message: string;
  statusCode: number;
  errorCode?: number;
  cause: any;

  constructor(error: IServerError) {
    super();
    this.message = this.cleanResponse(error);
    this.statusCode = error.statusCode;
    this.errorCode = error?.errorCode;
    this.cause = error.response;
  }

  cleanResponse(error: IServerError) {
    if (!error.response && error.message !== '') {
      return error.message;
    } else if (typeof error.response === 'string') {
      return error.response;
    } else {
      if (typeof error?.response?.message === 'object' && error.response.message.length > 0) {
        return error.response.message.reduce((acc, curr) => `${acc} \n${curr}`, '');
      } else {
        return error.message;
      }
    }
  }
}
