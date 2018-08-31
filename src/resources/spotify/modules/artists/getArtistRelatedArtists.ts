import { request, Request } from '../../request';
import { SpotifyFullArtist } from './definitions';

export type GetArtistRelatedArtistsOptions = {
  id: string;
};

type GetArtistRelatedArtistsRequest = Request<GetArtistRelatedArtistsOptions, SpotifyFullArtist[]>;

export const getArtistRelatedArtists: GetArtistRelatedArtistsRequest = ({ id }, requestOptions) =>
  request<{ artists: SpotifyFullArtist[] }>({
    ...requestOptions,
    endpoint: `/artists/${id}/related-artists`,
    method: 'GET',
  }).then(content => {
    return content.artists;
  });
