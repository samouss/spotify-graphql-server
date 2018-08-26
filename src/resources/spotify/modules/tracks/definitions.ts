import { SpotifyExternalURLS, SpotifyExternalIDs, SpotifyRestrictions } from '../definitions';
import { SpotifySimplifiedArtist } from '../artists';
import { SpotifySimplifiedAlbum } from '../albums';

export type SpotifyTrackLink = {
  external_urls: SpotifyExternalURLS;
  href: string;
  id: string; // @WEAK: see https://spoti.fi/2wt4e9L
  type: 'track';
  uri: string; // @WEAK: see https://spoti.fi/2wt4e9L
};

export type SpotifySimplifiedTrack = {
  artists: SpotifySimplifiedArtist[];
  available_markets: string[]; // @WEAK: ISO 3166-1 alpha-2 country codes
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: SpotifyExternalURLS;
  href: string;
  id: string; // @WEAK: see https://spoti.fi/2wt4e9L
  is_local: boolean;
  is_playable?: boolean;
  linked_from?: SpotifyTrackLink;
  name: string;
  preview_url: string | null;
  restrictions?: SpotifyRestrictions;
  track_number: number;
  type: 'track';
  uri: string; // @WEAK: see https://spoti.fi/2wt4e9L
};

export type SpotifyFullTrack = SpotifySimplifiedTrack & {
  album: SpotifySimplifiedAlbum;
  external_ids: SpotifyExternalIDs;
  popularity: number;
};
