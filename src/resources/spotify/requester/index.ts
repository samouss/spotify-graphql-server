export type RequesterHeaders = {
  [key: string]: string; // @WEAK: should be a JSON value
};

export type RequesterBody = {
  [key: string]: string; // @WEAK: should be a JSON value
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
