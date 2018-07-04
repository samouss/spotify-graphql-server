import { getArtist, GetArtistOptions, SpotifyArtist } from './getArtist';
import { getArtistAlbums, GetArtistAlbumsOptions, SpotifyAlbum } from './getArtistAlbums';

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

  getArtistAlbums(
    args: GetArtistAlbumsOptions,
    requestOptions?: SpotifyClientRequestOptions,
  ): Promise<SpotifyAlbum[]>;
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

export { SpotifyArtist };
export { SpotifyAlbum };
