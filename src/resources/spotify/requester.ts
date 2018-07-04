import fetch, { Response, Headers } from 'node-fetch';

export type RequesterOptions = {
  endpoint: string;
  method: 'GET' | 'POST';
  credentials: string;
};

export type RequesterBody = {
  [key: string]: string;
};

export type RequesterResponse = {
  status: number;
  headers: Headers;
  body: any;
};

const createClientResponse = (
  response: Response,
): Promise<RequesterResponse> => {
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

const requester = ({ endpoint, method, credentials }: RequesterOptions) => {
  const uri = `https://api.spotify.com/v1${endpoint}`;
  const options = {
    headers: {
      authorization: `Bearer ${credentials}`,
      'content-type': 'application/json',
    },
    method,
  };

  return fetch(uri, options)
    .then(createClientResponse)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }

      return Promise.reject(response);
    });
};

export default requester;
