import {
  SpotifyExternalURLs,
  SpotifyImage,
  SpotifyExternalIds,
  SpotifyRestrictions,
  SpotifyGenres,
} from '../../definitions';
import { SpotifyGraphQLArtist } from '../artists';

export type SpotifyAlbumType = 'album' | 'single' | 'compilation';
export type SpotifyAlbumGroup = SpotifyAlbumType | 'appears_on';
export type SpotifyAlbumReleaseDatePrecision = 'year' | 'month' | 'day';
export type SpotifyAlbumCopyrightType = 'C' | 'P';

export type SpotifyAlbumCopyright = {
  text: string;
  type: SpotifyAlbumCopyrightType;
};

export type SpotifyGraphQLAlbum = {
  albumGroup?: SpotifyAlbumGroup;
  albumType: SpotifyAlbumType;
  artists: SpotifyGraphQLArtist[];
  availableMarkets: string[]; // @WEAK: ISO 3166-1 alpha-2 country codes
  copyrights: SpotifyAlbumCopyright[];
  externalIds: SpotifyExternalIds;
  externalURLs: SpotifyExternalURLs;
  genres: SpotifyGenres;
  href: string;
  id: string;
  image: SpotifyImage;
  images: SpotifyImage[];
  label: string;
  name: string;
  popularity: number;
  releaseDate: string;
  releaseDatePrecision: SpotifyAlbumReleaseDatePrecision;
  restrictions?: SpotifyRestrictions;
  tracks: SpotifyGraphQLTrackConnection;
  type: 'album';
  uri: string;
};

export type SpotifyGraphQLTrackConnection = {
  [key: string]: any;
};
