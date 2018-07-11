import { request, Request, RequestParams } from '../../request';
import { Pagination } from '../definitions';
import { SpotifySimplifiedAlbum, SpotifyAlbumGroup } from '../albums';

export type GetArtistAlbumsOptions = {
  id: string;
  include_groups?: SpotifyAlbumGroup[];
  market?: string; // @WEAK: ISO 3166-1 alpha-2 country codes
  limit?: number;
  offset?: number;
};

type GetArtistAlbumsRequest = Request<GetArtistAlbumsOptions, Pagination<SpotifySimplifiedAlbum>>;

export const getArtistAlbums: GetArtistAlbumsRequest = (
  { id, include_groups, market, limit, offset },
  requestOptions,
) => {
  const params: RequestParams = {};

  if (include_groups) {
    params.include_groups = include_groups.join(',');
  }

  if (market) {
    params.market = market;
  }

  if (limit) {
    params.limit = limit;
  }

  if (offset) {
    params.offset = offset;
  }

  return request<Pagination<SpotifySimplifiedAlbum>>({
    ...requestOptions,
    endpoint: `/artists/${id}/albums`,
    method: 'GET',
    params,
  });
};
