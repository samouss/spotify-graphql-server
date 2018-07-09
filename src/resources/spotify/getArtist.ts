import { request, Request } from './request';

export type GetArtistOptions = {
  id: string;
};

export type SpotifyExternalURLS = {
  [key: string]: string;
};

export type SpotifyFollowers = {
  href: string;
  total: number;
};

export type SpotifyImage = {
  height: string;
  url: number;
  width: number;
};

// @WEAK: use composition with SpotifySimplifiedArtist
export type SpotifyFullArtist = {
  external_urls: SpotifyExternalURLS;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
};

type GetArtistRequest = Request<GetArtistOptions, SpotifyFullArtist>;

export const getArtist: GetArtistRequest = ({ id }, requestOptions) =>
  request<SpotifyFullArtist>({
    ...requestOptions,
    endpoint: `/artists/${id}`,
    method: 'GET',
  });
