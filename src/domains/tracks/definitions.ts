import { SpotifyExternalIds, SpotifyExternalURLs, SpotifyRestrictions } from '../definitions';
import { SpotifyGraphQLAlbum } from '../albums';
import { SpotifyGraphQLArtist } from '../artists';

export type TrackLink = {
  externalURLs: SpotifyExternalURLs;
  href: string;
  id: string;
  type: string;
  uri: string;
};

export type SpotifyTrack = {
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
  isPlayable: boolean;
  linkedFrom: TrackLink;
  restrictions: SpotifyRestrictions;
  name: string;
  popularity: number;
  previewURL: string | null;
  trackNumber: number;
  type: 'track';
  uri: string;
  isLocal: boolean;
};
