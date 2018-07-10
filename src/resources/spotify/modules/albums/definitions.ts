import { SpotifyExternalURLS, SpotifyImage } from '../definitions';
import { SpotifySimplifiedArtist } from '../artists';

export type SpotifyAlbumType = 'album' | 'single' | 'compilation';

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
  type: 'album';
  uri: string;
};
