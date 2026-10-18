import axios, { AxiosInstance } from 'axios';

export class AxiosSingleton {
  static instance: AxiosInstance;

  static init(baseURL: string) {
    AxiosSingleton.instance = axios.create({
      baseURL,
    });
    AxiosSingleton.instance.defaults.headers['Content-Type'] = 'application/json';
  }

  static getInstance(baseURL: string) {
    if (!AxiosSingleton.instance) {
      AxiosSingleton.init(baseURL);
    }
    return AxiosSingleton.instance;
  }

  static attachBearerToken(jwtToken: string) {
    AxiosSingleton.instance.interceptors.request.use(async (config) => {
      config.headers['Authorization'] = `Bearer ${jwtToken}`;
      return config;
    });
  }
}
