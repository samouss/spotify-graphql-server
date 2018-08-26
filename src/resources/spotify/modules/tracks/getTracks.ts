import { request, Request, RequestParams } from '../../request';
import { SpotifyFullTrack } from './definitions';

export type GetTracksOptions = {
  ids: string[];
  market?: string; // @WEAK: ISO 3166-1 alpha-2 country codes
};

type GetTracksRequest = Request<GetTracksOptions, SpotifyFullTrack[]>;

export const getTracks: GetTracksRequest = ({ ids, market }, requestOptions) => {
  const params: RequestParams = {
    ids: ids.join(','),
  };

  if (market) {
    params.market = market;
  }

  return request<{ tracks: SpotifyFullTrack[] }>({
    ...requestOptions,
    endpoint: `/tracks`,
    method: 'GET',
    params,
  }).then(content => {
    return content.tracks;
  });
};
