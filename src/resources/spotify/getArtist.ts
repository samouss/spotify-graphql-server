import { SpotifyClientRequestOptions } from './index';
import requester from './requester';

export type GetArtistOptions = {
  id: string;
};

export type SpotifyArtist = {
  name: string;
  popularity: number;
};

export const getArtist = (
  { id }: GetArtistOptions,
  { credentials }: SpotifyClientRequestOptions,
): Promise<SpotifyArtist> =>
  requester({
    endpoint: `/artists/${id}`,
    method: 'GET',
    credentials,
  }).then(content => ({
    name: content.body.name,
    popularity: content.body.popularity,
  }));
