import { request, Request } from '../../request';
import { SpotifyFullArtist } from './definitions';

export type GetArtistOptions = {
  id: string;
};

type GetArtistRequest = Request<GetArtistOptions, SpotifyFullArtist>;

export const getArtist: GetArtistRequest = ({ id }, requestOptions) =>
  request<SpotifyFullArtist>({
    ...requestOptions,
    endpoint: `/artists/${id}`,
    method: 'GET',
  });
