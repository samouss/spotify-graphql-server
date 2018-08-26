import { request, Request } from '../../request';
import { SpotifyFullArtist } from './definitions';

export type GetArtistsOptions = {
  ids: string[];
};

type GetArtistsRequest = Request<GetArtistsOptions, SpotifyFullArtist[]>;

export const getArtists: GetArtistsRequest = ({ ids }, requestOptions) => {
  const params = {
    ids: ids.join(','),
  };

  return request<{ artists: SpotifyFullArtist[] }>({
    ...requestOptions,
    endpoint: `/artists/`,
    method: 'GET',
    params,
  }).then(content => {
    return content.artists;
  });
};
