import { request, Request } from '../../request';
import { SpotifyFullTrack } from './definitions';

export type GetTrackOptions = {
  id: string;
};

type GetTrackRequest = Request<GetTrackOptions, SpotifyFullTrack>;

export const getTrack: GetTrackRequest = ({ id }, requestOptions) =>
  request<SpotifyFullTrack>({
    ...requestOptions,
    endpoint: `/tracks/${id}`,
    method: 'GET',
  });
