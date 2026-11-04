export const createMockHttpConnection = () => ({
  baseUrl: 'http://mock-api.com',
  options: jest.fn(),
  handleError: jest.fn(),
  getDefaultHeaders: jest.fn(),
  attachBearerToken: jest.fn(),
});

export const mockInfrastructure = () => {
  jest.mock('@clean-rn/shared/infrastructure', () => ({
    HttpConnection: {
      getInstance: jest.fn(),
    },
    ServerError: jest.fn().mockImplementation(function (error) {
      this.message = error.message;
      this.name = 'ServerError';
      this.statusCode = error.statusCode;
      this.codeError = error.codeError;
      this.cause = error.response;
    }),
  }));
};
