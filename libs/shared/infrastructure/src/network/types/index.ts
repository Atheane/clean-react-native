export enum IHttpVerb {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type IServerError = {
  statusCode: number;
  message: string;
  response?:
    | string
    | {
        statusCode: number;
        message: string[] | string;
        error: any;
      };
  timestamp?: string;
  path?: string;
};
