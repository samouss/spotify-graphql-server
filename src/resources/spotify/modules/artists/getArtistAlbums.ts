import { request, Request } from '../../request';
import { Pagination } from '../definitions';
import { SpotifySimplifiedAlbum } from '../albums';

export type GetArtistAlbumsOptions = {
  id: string;
};

type GetArtistAlbumsRequest = Request<GetArtistAlbumsOptions, Pagination<SpotifySimplifiedAlbum>>;

export const getArtistAlbums: GetArtistAlbumsRequest = ({ id }, requestOptions) =>
  request<Pagination<SpotifySimplifiedAlbum>>({
    ...requestOptions,
    endpoint: `/artists/${id}/albums`,
    method: 'GET',
  });
