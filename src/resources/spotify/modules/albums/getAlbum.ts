import { request, Request } from '../../request';
import { SpotifyFullAlbum } from './definitions';

export type GetAlbumOptions = {
  id: string;
};

type GetAlbumRequest = Request<GetAlbumOptions, SpotifyFullAlbum>;

export const getAlbum: GetAlbumRequest = ({ id }, requestOptions) =>
  request<SpotifyFullAlbum>({
    ...requestOptions,
    endpoint: `/albums/${id}`,
    method: 'GET',
  });
