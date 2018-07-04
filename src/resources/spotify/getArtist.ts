import { SpotifyClientRequestOptions } from './index';
import requester from './requester';

export type GetArtistOptions = {
  id: string;
};

// @WEAK Use the raw API Type
export type SpotifyArtist = {
  id: string;
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
    id: content.body.id,
    name: content.body.name,
    popularity: content.body.popularity,
  }));
