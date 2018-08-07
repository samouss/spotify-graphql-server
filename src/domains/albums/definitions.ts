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

export type SpotifyGraphQLAlbum = {
  albumGroup?: SpotifyAlbumGroup;
  albumType: SpotifyAlbumType;
  arists: SpotifyGraphQLArtist[];
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
  releaseDatePreciseion: string;
  restrictions: SpotifyRestrictions;
  type: 'album';
  uri: string;
  tracksConnection: SpotifyGraphQLTrackConnection;
};

export type SpotifyGraphQLTrackConnection = {
  [key: string]: any;
};
