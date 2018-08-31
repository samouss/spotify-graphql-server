import { Pagination } from './modules/definitions';
import {
  getArtist,
  getArtists,
  getArtistAlbums,
  getArtistRelatedArtists,
  GetArtistOptions,
  GetArtistsOptions,
  GetArtistAlbumsOptions,
  GetArtistRelatedArtistsOptions,
  SpotifyFullArtist,
} from './modules/artists';
import {
  getAlbum,
  getAlbums,
  getAlbumTracks,
  GetAlbumOptions,
  GetAlbumsOptions,
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
  getArtists: SpotifyClientRequest<GetArtistsOptions, SpotifyFullArtist[]>;
  getArtistAlbums: SpotifyClientRequest<GetArtistAlbumsOptions, Pagination<SpotifySimplifiedAlbum>>;
  getArtistRelatedArtists: SpotifyClientRequest<
    GetArtistRelatedArtistsOptions,
    SpotifyFullArtist[]
  >;
  getAlbum: SpotifyClientRequest<GetAlbumOptions, SpotifyFullAlbum>;
  getAlbums: SpotifyClientRequest<GetAlbumsOptions, SpotifyFullAlbum[]>;
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

    getArtists(args, requestOptions) {
      return getArtists(args, {
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

    getArtistRelatedArtists(args, requestOptions) {
      return getArtistRelatedArtists(args, {
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

    getAlbums(args, requestOptions) {
      return getAlbums(args, {
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
