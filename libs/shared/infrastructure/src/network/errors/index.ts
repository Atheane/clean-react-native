/* eslint-disable @typescript-eslint/no-explicit-any */

export class ServerError extends Error {
  message: string;
  code: string;
  cause: any;

  constructor(error: ServerErrorOptions) {
    super();
    this.message = this.cleanResponse(error);
    this.code = error.statusCode.toString();
    this.cause = error.response;
  }

  cleanResponse(error: ServerErrorOptions) {
    if (error.response === '' && error.message !== '') {
      return error.message;
    } else if (typeof error.response === 'string') {
      return error.response;
    } else {
      if (typeof error.response.message === 'object' && error.response.message.length > 0) {
        return error.response.message.reduce((acc, curr) => `${acc} \n${curr}`, '');
      } else {
        return error.message;
      }
    }
  }
}

type ServerErrorOptions = {
  statusCode: number;
  message: string;
  response:
    | string
    | {
        statusCode: number;
        message: string[] | string;
        error: any;
      };
  timestamp: string;
  path: string;
};
