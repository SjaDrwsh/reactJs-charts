import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { getBaseUrl } from '../api/urls';

/**
 * Execute the provided AxiosPromise and return the data returned by the call
 * Extract and throw the correct error if request fails
 */
export async function sendRequest<T>(
  axiosPromise: AxiosPromise<T>
): Promise<T> {
  try {
    return (await axiosPromise).data;
  } catch (error) {
    // would have written a component for errors and shown errors in a nice design there
    throw new Error(error);
  }
}

/**
 * Function that defines the success interceptor logic
 * all code defined here will be executed before the requests or responses "then" handler
 */
function onSuccessInterceptor(value: any): any {
  // for all success cases do nothing, just forward the response
  return value;
}

function onErrorInterceptor(error: any): any {
  if (!error.response) {
    // we have a network error
    return Promise.reject(error);
  } else {
    return Promise.reject(error);
  }
}

type Client = {
  // we only need GET for this project
  get: (url: string, long?: boolean) => AxiosPromise<any>;
};

function client(): Client {
  const baseURL = getBaseUrl();

  function getDefaultRequest(): AxiosInstance {
    const instance = axios.create({
      timeout: 30000,
      baseURL: baseURL,
    });

    // add axios interceptors to axios instance
    instance.interceptors.response.use(
      onSuccessInterceptor,
      onErrorInterceptor
    );

    return instance;
  }

  function getHeader(): any {
    return {
      'Content-Type': 'application/json',
    };
  }

  return {
    // if we needed any header i would have added them here but this is a public api
    get: async (url: string) =>
      getDefaultRequest().get(url, { headers: getHeader() }),
  };
}

const request = client();
export default request;
