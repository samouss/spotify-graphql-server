import { SpotifyExternalURLS, SpotifyImage } from '../definitions';

export type SpotifyAlbumType = 'album' | 'single' | 'compilation';
export type SpotifyAlbumGroup = SpotifyAlbumType | 'appears_on';

export type SpotifyGraphQLAlbum = {
  albumGroup?: string;
  albumType: SpotifyAlbumType;
  availableMarkets: string[]; // @WEAK: ISO 3166-1 alpha-2 country codes
  externalURLs: SpotifyExternalURLS;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  type: 'album';
  uri: string;
  artistsConnection: SpotifyGraphQLAlbumArtistsConnection;
};

export type SpotifyGraphQLAlbumArtistsConnection = {
  [key: string]: any;
};
