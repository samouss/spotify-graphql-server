import {
  SpotifyExternalURLS,
  SpotifyExternalIDs,
  SpotifyRestrictions,
  SpotifyImage,
  Pagination,
} from '../definitions';
import { SpotifySimplifiedArtist } from '../artists';
import { SpotifySimplifiedTrack } from '../tracks';

export type SpotifyAlbumType = 'album' | 'single' | 'compilation';
export type SpotifyAlbumGroup = SpotifyAlbumType | 'appears_on';
export type SpotifyAlbumReleaseDatePrecision = 'year' | 'month' | 'day';
export type SpotifyAlbumCoppyrightType = 'C' | 'P';

export type SpotifyAlbumCoppyright = {
  text: string;
  type: SpotifyAlbumCoppyrightType;
};

export type SpotifySimplifiedAlbum = {
  album_group?: string;
  album_type: SpotifyAlbumType;
  artists: SpotifySimplifiedArtist[];
  available_markets: string[]; // @WEAK: ISO 3166-1 alpha-2 country codes
  external_urls: SpotifyExternalURLS;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: SpotifyAlbumReleaseDatePrecision;
  restrictions?: SpotifyRestrictions;
  type: 'album';
  uri: string;
};

export type SpotifyFullAlbum = SpotifySimplifiedAlbum & {
  copyrights: SpotifyAlbumCoppyright[];
  external_ids: SpotifyExternalIDs;
  genres: string[]; // @WEAK: List the all available genres
  label: string;
  popularity: number; // @WEAK: 0 < x < 100
  tracks: Pagination<SpotifySimplifiedTrack>;
};
