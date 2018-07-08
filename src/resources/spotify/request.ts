// @TODO: inject
import { requester } from './requester/fetch';
import { RequesterHeaders, RequesterBody } from './requester';
import { SpotifyClientRequestOptions } from './index';

type RequestHeaders = RequesterHeaders;
type RequestBody = RequesterBody;

type RequestParams = {
  [key: string]: string; // @WEAK: should be a JSON value
};

type RequestOptions = {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  credentials: string;
  headers?: RequestHeaders;
  params?: RequestParams;
  body?: RequestBody;
};

export type Request<T, U> = (options: T, requestOptions: SpotifyClientRequestOptions) => Promise<U>;

export const request = <T>({ endpoint, method, credentials, headers }: RequestOptions) => {
  return requester<T>({
    endpoint: `https://api.spotify.com/v1${endpoint}`,
    headers: {
      Authorization: `Bearer ${credentials}`,
      'Content-Type': 'application/json',
      ...headers,
    },
    method,
  }).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }

    return Promise.reject(response);
  });
};
