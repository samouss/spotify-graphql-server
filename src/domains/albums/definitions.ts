import {
  SpotifyExternalURLs,
  SpotifyImage,
  SpotifyCopyright,
  SpotifyExternalIds,
  SpotifyRestrictions,
  SpotifyGenres,
} from '../definitions';
import { SpotifyGraphQLArtist } from '../artists';

export type SpotifyAlbumType = 'album' | 'single' | 'compilation';
export type SpotifyAlbumGroup = SpotifyAlbumType | 'appears_on';

export type ReleaseDatePrecision = 'year' | 'month' | 'day';

export type SpotifyGraphQLAlbum = {
  albumGroup?: SpotifyAlbumGroup;
  albumType: SpotifyAlbumType;
  artists: SpotifyGraphQLArtist[];
  availableMarkets: string[]; // @WEAK: ISO 3166-1 alpha-2 country codes
  copyrights: SpotifyCopyright;
  externalIds: SpotifyExternalIds;
  externalURLs: SpotifyExternalURLs;
  genres: SpotifyGenres;
  href: string;
  id: string;
  images: SpotifyImage[];
  label: string;
  name: string;
  popularity: number;
  releaseDate: string;
  releaseDatePrecision: ReleaseDatePrecision;
  restrictions: SpotifyRestrictions;
  tracks: SpotifyGraphQLTrackConnection;
  type: 'album';
  uri: string;
};

export type SpotifyGraphQLTrackConnection = {
  [key: string]: any;
};
