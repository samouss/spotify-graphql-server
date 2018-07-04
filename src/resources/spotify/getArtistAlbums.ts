import { SpotifyClientRequestOptions } from './index';
import requester from './requester';

export type GetArtistAlbumsOptions = {
  id: string;
};

// @WEAK Use the raw API Type
export type SpotifyAlbum = {
  id: string;
  name: string;
  album_type: 'album' | 'single' | 'compilation';
};

export const getArtistAlbums = (
  { id }: GetArtistAlbumsOptions,
  { credentials }: SpotifyClientRequestOptions,
): Promise<SpotifyAlbum[]> =>
  requester({
    endpoint: `/artists/${id}/albums`,
    method: 'GET',
    credentials,
  }).then(content => {
    return content.body.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      album_type: item.album_type,
    }));
  });
