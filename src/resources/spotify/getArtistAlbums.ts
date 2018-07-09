import { request, Request } from './request';

export type GetArtistAlbumsOptions = {
  id: string;
};

// @WEAK Use the raw API Type
export type SpotifyAlbum = {
  id: string;
  name: string;
  album_type: 'album' | 'single' | 'compilation';
};

type GetArtistAlbumsRequest = Request<GetArtistAlbumsOptions, SpotifyAlbum[]>;

export const getArtistAlbums: GetArtistAlbumsRequest = ({ id }, requestOptions) =>
  request<SpotifyAlbum[]>({
    ...requestOptions,
    endpoint: `/artists/${id}/albums`,
    method: 'GET',
  });
