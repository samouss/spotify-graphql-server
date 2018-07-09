import { requester, RequesterHeaders, RequesterBody } from './requester'; // @TODO: inject
import { SpotifyClientRequestOptions } from './client';

type RequestHeaders = RequesterHeaders;
type RequestBody = RequesterBody;

type RequestParams = {
  [key: string]: string | number; // @WEAK: should be a JSON value
};

export type RequestOptions = {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  credentials: string;
  headers?: RequestHeaders;
  params?: RequestParams;
  body?: RequestBody;
};

export type Request<T, U> = (options: T, requestOptions: SpotifyClientRequestOptions) => Promise<U>;

const createEndpointWithParams = (endpoint: string, params: RequestParams = {}) =>
  Object.keys(params).reduce(
    (acc, key, index) => `${acc}${index === 0 ? '?' : '&'}${key}=${params[key]}`,
    endpoint,
  );

export const request = <T>(options: RequestOptions): Promise<T> => {
  const { endpoint, method, credentials, headers, params, body } = options;

  return requester<T>({
    endpoint: createEndpointWithParams(`https://api.spotify.com/v1${endpoint}`, params),
    headers: {
      Authorization: `Bearer ${credentials}`,
      'Content-Type': 'application/json',
      ...headers,
    },
    method,
    body,
  }).then(response => {
    if (response.status >= 200 && response.status <= 299) {
      return Promise.resolve(response.body);
    }

    return Promise.reject(response);
  });
};
