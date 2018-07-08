import fetch, { Response } from 'node-fetch';
import { RequesterOptions, RequesterResponse } from './index';

const createClientResponse = <T>(response: Response): Promise<RequesterResponse<T>> => {
  return response
    .json()
    .then((content: any) => ({
      status: response.status,
      headers: response.headers,
      body: content,
    }))
    .catch(() => {
      throw new Error('ERROR.PARSE');
    });
};

export const requester = <T>({
  endpoint,
  method,
  headers,
}: RequesterOptions): Promise<RequesterResponse<T>> => {
  const options = {
    method,
    headers,
  };

  return fetch(endpoint, options).then(createClientResponse);
};
