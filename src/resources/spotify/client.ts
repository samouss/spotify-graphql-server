import { Pagination } from './modules/definitions';
import {
  getArtist,
  getArtistAlbums,
  GetArtistOptions,
  GetArtistAlbumsOptions,
  SpotifyFullArtist,
} from './modules/artists';
import {
  getAlbum,
  getAlbumTracks,
  GetAlbumOptions,
  GetAlbumTracksOptions,
  SpotifySimplifiedAlbum,
  SpotifyFullAlbum,
} from './modules/albums';
import {
  getTrack,
  getTracks,
  GetTrackOptions,
  GetTracksOptions,
  SpotifySimplifiedTrack,
  SpotifyFullTrack,
} from './modules/tracks';

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
  getAlbum: SpotifyClientRequest<GetAlbumOptions, SpotifyFullAlbum>;
  getAlbumTracks: SpotifyClientRequest<GetAlbumTracksOptions, Pagination<SpotifySimplifiedTrack>>;
  getTrack: SpotifyClientRequest<GetTrackOptions, SpotifyFullTrack>;
  getTracks: SpotifyClientRequest<GetTracksOptions, SpotifyFullTrack[]>;
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

    getAlbum(args, requestOptions) {
      return getAlbum(args, {
        credentials,
        ...requestOptions,
      });
    },

    getAlbumTracks(args, requestOptions) {
      return getAlbumTracks(args, {
        credentials,
        ...requestOptions,
      });
    },

    getTrack(args, requestOptions) {
      return getTrack(args, {
        credentials,
        ...requestOptions,
      });
    },

    getTracks(args, requestOptions) {
      return getTracks(args, {
        credentials,
        ...requestOptions,
      });
    },
  };
};
