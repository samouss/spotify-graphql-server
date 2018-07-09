import { request, Request } from './request';

export type GetArtistAlbumsOptions = {
  id: string;
};

export type SpotifySimplifiedArtist = {
  external_urls: SpotifyExternalURLS;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type SpotifyAlbumType = 'album' | 'single' | 'compilation';

export type SpotifyExternalURLS = {
  [key: string]: string;
};

export type SpotifyImage = {
  height: string;
  url: number;
  width: number;
};

export type Pagination<T> = {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type SpotifySimplifiedAlbum = {
  album_group?: string;
  album_type: SpotifyAlbumType;
  artists: SpotifySimplifiedArtist[];
  available_markets: string[]; // @WEAK: ISO 3166-1 alpha-2 country codes
  external_urls: SpotifyExternalURLS;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  type: 'album';
  uri: string;
};

type GetArtistAlbumsRequest = Request<GetArtistAlbumsOptions, Pagination<SpotifySimplifiedAlbum>>;

export const getArtistAlbums: GetArtistAlbumsRequest = ({ id }, requestOptions) =>
  request<Pagination<SpotifySimplifiedAlbum>>({
    ...requestOptions,
    endpoint: `/artists/${id}/albums`,
    method: 'GET',
  });
