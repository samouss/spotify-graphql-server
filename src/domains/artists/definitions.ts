import { SpotifyExternalURLS, SpotifyFollowers, SpotifyImage } from '../definitions';

export type SpotifyGraphQLArtist = {
  externalURLs: SpotifyExternalURLS;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
  albumsConnection: SpotifyGraphQLArtistAlbumsConnection;
};

export type SpotifyGraphQLArtistAlbumsConnection = {
  [key: string]: any;
};
