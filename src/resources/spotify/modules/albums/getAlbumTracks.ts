import { request, Request, RequestParams } from '../../request';
import { Pagination } from '../definitions';
import { SpotifySimplifiedTrack } from '../tracks';

export type GetAlbumTracksOptions = {
  id: string;
  market?: string; // @WEAK: ISO 3166-1 alpha-2 country codes
  limit?: number;
  offset?: number;
};

type GetAlbumTracksRequest = Request<GetAlbumTracksOptions, Pagination<SpotifySimplifiedTrack>>;

export const getAlbumTracks: GetAlbumTracksRequest = (
  { id, market, limit, offset },
  requestOptions,
) => {
  const params: RequestParams = {};

  if (market) {
    params.market = market;
  }

  if (limit) {
    params.limit = limit;
  }

  if (offset) {
    params.offset = offset;
  }

  return request<Pagination<SpotifySimplifiedTrack>>({
    ...requestOptions,
    endpoint: `/albums/${id}/tracks`,
    method: 'GET',
    params,
  });
};
