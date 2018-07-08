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
  }).then(content => {
    // @WEAK Use the raw API Type
    return (content.body as any).items.map((item: any) => ({
      id: item.id,
      name: item.name,
      album_type: item.album_type,
    }));
  });
