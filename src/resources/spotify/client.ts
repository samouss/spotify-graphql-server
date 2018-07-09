import { getArtist, GetArtistOptions, SpotifyArtist } from './getArtist';
import { getArtistAlbums, GetArtistAlbumsOptions, SpotifyAlbum } from './getArtistAlbums';

export type SpotifyClientOptions = {
  credentials: string;
};

export type SpotifyClientRequestOptions = {
  credentials: string;
};

export type SpotifyClientRequest<T, U> = (
  options: T,
  requestOptions?: SpotifyClientRequestOptions,
) => Promise<U>;

export type SpotifyClient = {
  getArtist: SpotifyClientRequest<GetArtistOptions, SpotifyArtist>;
  getArtistAlbums: SpotifyClientRequest<GetArtistAlbumsOptions, SpotifyAlbum[]>;
};

export const createSpotifyClient = ({ credentials }: SpotifyClientOptions): SpotifyClient => {
  return {
    getArtist(args, requestOptions) {
      return getArtist(args, {
        credentials,
        ...requestOptions,
      });
    },

    getArtistAlbums(args, requestOptions) {
      return getArtistAlbums(args, {
        credentials,
        ...requestOptions,
      });
    },
  };
};
