import { requester } from '../requester';
import { request, RequestOptions } from '../request';

jest.mock('../requester');

afterEach(() => {
  (requester as jest.Mock).mockReset();
});

describe('request', () => {
  describe('endpoint', () => {
    it('expect to create a request to `https://api.spotify.com/v1/me`', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
      };

      return request(options).then(() => {
        expect(requester).toHaveBeenCalledTimes(1);
        expect(requester).toHaveBeenCalledWith(
          expect.objectContaining({
            endpoint: 'https://api.spotify.com/v1/me',
          }),
        );
      });
    });

    it('expect to create a request to `https://api.spotify.com/v1/me?limit=5`', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
        params: {
          limit: 5,
        },
      };

      return request(options).then(() => {
        expect(requester).toHaveBeenCalledTimes(1);
        expect(requester).toHaveBeenCalledWith(
          expect.objectContaining({
            endpoint: 'https://api.spotify.com/v1/me?limit=5',
          }),
        );
      });
    });

    it('expect to create a request to `https://api.spotify.com/v1/me?limit=5&offset=10`', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
        params: {
          limit: 5,
          offset: 10,
        },
      };

      return request(options).then(() => {
        expect(requester).toHaveBeenCalledTimes(1);
        expect(requester).toHaveBeenCalledWith(
          expect.objectContaining({
            endpoint: 'https://api.spotify.com/v1/me?limit=5&offset=10',
          }),
        );
      });
    });
  });

  describe('method', () => {
    it('expect to create a `GET` request', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
      };

      return request(options).then(() => {
        expect(requester).toHaveBeenCalledTimes(1);
        expect(requester).toHaveBeenCalledWith(
          expect.objectContaining({
            method: 'GET',
          }),
        );
      });
    });

    it('expect to create a `POST` request', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          body: {},
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'POST',
        credentials: 'TOKEN',
      };

      return request(options).then(() => {
        expect(requester).toHaveBeenCalledTimes(1);
        expect(requester).toHaveBeenCalledWith(
          expect.objectContaining({
            method: 'POST',
          }),
        );
      });
    });

    it('expect to create a `PUT` request', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'PUT',
        credentials: 'TOKEN',
      };

      return request(options).then(() => {
        expect(requester).toHaveBeenCalledTimes(1);
        expect(requester).toHaveBeenCalledWith(
          expect.objectContaining({
            method: 'PUT',
          }),
        );
      });
    });

    it('expect to create a `DELETE` request', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'DELETE',
        credentials: 'TOKEN',
      };

      return request(options).then(() => {
        expect(requester).toHaveBeenCalledTimes(1);
        expect(requester).toHaveBeenCalledWith(
          expect.objectContaining({
            method: 'DELETE',
          }),
        );
      });
    });
  });

  describe('headers', () => {
    it('expect to create a request with Content-Type', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
      };

      return request(options).then(() => {
        expect(requester).toHaveBeenCalledTimes(1);
        expect(requester).toHaveBeenCalledWith(
          expect.objectContaining({
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
            }),
          }),
        );
      });
    });

    it('expect to create a request with credentials', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
      };

      return request(options).then(() => {
        expect(requester).toHaveBeenCalledTimes(1);
        expect(requester).toHaveBeenCalledWith(
          expect.objectContaining({
            headers: {
              Authorization: 'Bearer TOKEN',
              'Content-Type': 'application/json',
            },
          }),
        );
      });
    });

    it('expect to create a request with additional headers', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
        headers: {
          'X-Analytics': '2001',
        },
      };

      return request(options).then(() => {
        expect(requester).toHaveBeenCalledTimes(1);
        expect(requester).toHaveBeenCalledWith(
          expect.objectContaining({
            headers: {
              Authorization: 'Bearer TOKEN',
              'Content-Type': 'application/json',
              'X-Analytics': '2001',
            },
          }),
        );
      });
    });
  });

  describe('body', () => {
    it('expect to create a request with body', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
        body: {
          hello: 'world',
        },
      };

      return request(options).then(() => {
        expect(requester).toHaveBeenCalledTimes(1);
        expect(requester).toHaveBeenCalledWith(
          expect.objectContaining({
            body: {
              hello: 'world',
            },
          }),
        );
      });
    });

    it('expect to create a request without body', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
      };

      return request(options).then(() => {
        expect(requester).toHaveBeenCalledTimes(1);
        expect(requester).toHaveBeenCalledWith(
          expect.objectContaining({
            body: undefined,
          }),
        );
      });
    });
  });
});

describe('response', () => {
  describe('success', () => {
    it('expect to resolve with a status (>= 200 & <= 299)', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
      };

      return request(options);
    });

    it('expect to resolve with body', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          body: {
            hello: 'world',
          },
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
      };

      const expectation = {
        hello: 'world',
      };

      return request(options).then(content => {
        expect(content).toEqual(expectation);
      });
    });
  });

  describe('failure', () => {
    it('expect to reject with a status (< 200)', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 100,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
      };

      return request(options).catch(err => {
        expect(err.status).toBe(100);
      });
    });

    it('expect to reject with a status (> 299)', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 400,
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
      };

      return request(options).catch(err => {
        expect(err.status).toBe(400);
      });
    });

    it('expect to reject with response', () => {
      (requester as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 400,
          body: {
            hello: 'world',
          },
        }),
      );

      const options: RequestOptions = {
        endpoint: '/me',
        method: 'GET',
        credentials: 'TOKEN',
      };

      const expectation = {
        status: 400,
        body: {
          hello: 'world',
        },
      };

      return request(options).catch(err => {
        expect(err).toEqual(expectation);
      });
    });
  });
});
