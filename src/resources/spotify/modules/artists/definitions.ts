import { SpotifyExternalURLS, SpotifyFollowers, SpotifyImage } from '../definitions';

export type SpotifySimplifiedArtist = {
  external_urls: SpotifyExternalURLS;
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
};

export type SpotifyFullArtist = SpotifySimplifiedArtist & {
  followers: SpotifyFollowers;
  genres: string[];
  images: SpotifyImage[];
  popularity: number;
};
