import { request, Request, RequestParams } from '../../request';
import { SpotifyFullTrack } from '../tracks';

export type GetArtistTopTracksOptions = {
  id: string;
  market: string | 'from_token'; // @WEAK: ISO 3166-1 alpha-2 country codes
};

type GetArtistTopTracksRequest = Request<GetArtistTopTracksOptions, SpotifyFullTrack[]>;

export const getArtistTopTracks: GetArtistTopTracksRequest = ({ id, market }, requestOptions) => {
  const params: RequestParams = {
    market,
  };

  return request<{ tracks: SpotifyFullTrack[] }>({
    ...requestOptions,
    endpoint: `/artists/${id}/top-tracks`,
    method: 'GET',
    params,
  })
    .then(content => {
      return content.tracks;
    })
    .catch(content => {
      console.log(content);
      return [];
    });
};
