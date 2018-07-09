import { getArtist, GetArtistOptions, SpotifyFullArtist } from './getArtist';
import {
  getArtistAlbums,
  GetArtistAlbumsOptions,
  Pagination,
  SpotifySimplifiedAlbum,
} from './getArtistAlbums';

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
  getArtist: SpotifyClientRequest<GetArtistOptions, SpotifyFullArtist>;
  getArtistAlbums: SpotifyClientRequest<GetArtistAlbumsOptions, Pagination<SpotifySimplifiedAlbum>>;
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
