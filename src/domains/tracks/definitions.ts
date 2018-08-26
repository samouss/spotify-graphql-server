import { SpotifyExternalIds, SpotifyExternalURLs, SpotifyRestrictions } from '../../definitions';
import { SpotifyGraphQLAlbum } from '../albums';
import { SpotifyGraphQLArtist } from '../artists';

export type SpotifyGraphQLTrackLink = {
  externalURLs: SpotifyExternalURLs;
  href: string;
  id: string;
  type: string;
  uri: string;
};

export type SpotifyGraphQLTrack = {
  album: SpotifyGraphQLAlbum;
  artists: SpotifyGraphQLArtist[];
  availableMarkets: string[]; // @WEAK: ISO 3166-1 alpha-2 country codes
  discNumber: number;
  durationMS: number;
  explicit: boolean;
  externalIds: SpotifyExternalIds;
  externalURLs: SpotifyExternalURLs;
  href: string;
  id: string;
  isLocal: boolean;
  isPlayable?: boolean;
  linkedFrom?: SpotifyGraphQLTrackLink;
  name: string;
  popularity: number;
  previewURL: string | null;
  restrictions?: SpotifyRestrictions;
  trackNumber: number;
  type: 'track';
  uri: string;
};
