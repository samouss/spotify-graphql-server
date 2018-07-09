import { request, Request } from './request'; // @TODO: inject

export type GetArtistOptions = {
  id: string;
};

// @WEAK Use the raw API Type
export type SpotifyArtist = {
  id: string;
  name: string;
  popularity: number;
};

type GetArtistRequest = Request<GetArtistOptions, SpotifyArtist>;

export const getArtist: GetArtistRequest = ({ id }, requestOptions) =>
  request<SpotifyArtist>({
    ...requestOptions,
    endpoint: `/artists/${id}`,
    method: 'GET',
  });
