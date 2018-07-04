import { getArtist, GetArtistOptions, SpotifyArtist } from './getArtist';

export type SpotifyClientOptions = {
  credentials: string;
};

export type SpotifyClientRequestOptions = {
  credentials: string;
};

export type SpotifyClient = {
  getArtist(
    args: GetArtistOptions,
    requestOptions?: SpotifyClientRequestOptions,
  ): Promise<SpotifyArtist>;
};

export const createSpotifyClient = ({
  credentials,
}: SpotifyClientOptions): SpotifyClient => {
  return {
    getArtist(args, requestOptions) {
      return getArtist(args, {
        credentials,
        ...requestOptions,
      });
    },
  };
};
