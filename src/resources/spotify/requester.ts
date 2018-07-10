import fetch, { RequestInit } from 'node-fetch';

export type RequesterHeaders = {
  [key: string]: string; // @WEAK: should be a JSON value
};

export type RequesterBody = {
  [key: string]: any; // @WEAK: should be a JSON value
};

export type RequesterOptions = {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: RequesterHeaders;
  body?: RequesterBody;
};

export type RequesterResponse<T> = {
  options: RequesterOptions;
  status: number;
  headers: RequesterHeaders;
  text: string;
  body: T;
};

export type Requester<T = {}> = (options: RequesterOptions) => Promise<RequesterResponse<T>>;

export const requester = <T>(requestOptions: RequesterOptions): Promise<RequesterResponse<T>> => {
  const { endpoint, method, headers, body } = requestOptions;

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(endpoint, options).then(response => {
    return Promise.all([response.clone().text(), response.clone().json()])
      .catch(err => {
        console.log(err); // @TODO: logger
        throw new Error('SPOTIFY_ERROR.PARSE');
      })
      .then(([text, body]) => ({
        status: response.status,
        headers: {},
        options: requestOptions,
        text,
        body,
      }));
  });
};
