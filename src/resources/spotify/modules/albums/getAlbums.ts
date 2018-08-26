import { request, Request, RequestParams } from '../../request';
import { SpotifyFullAlbum } from './definitions';

export type GetAlbumsOptions = {
  ids: string[];
  market?: string; // @WEAK: ISO 3166-1 alpha-2 country codes
};

type GetAlbumsRequest = Request<GetAlbumsOptions, SpotifyFullAlbum[]>;

export const getAlbums: GetAlbumsRequest = ({ ids, market }, requestOptions) => {
  const params: RequestParams = {
    ids: ids.join(','),
  };

  if (market) {
    params.market = market;
  }

  return request<{ albums: SpotifyFullAlbum[] }>({
    ...requestOptions,
    endpoint: `/albums`,
    method: 'GET',
    params,
  }).then(content => {
    return content.albums;
  });
};
