import { SpotifyExternalURLS, SpotifyFollowers, SpotifyImage, SpotifyGenres } from '../definitions';
import { SpotifyTrack } from '../tracks';

export type SpotifyGraphQLArtist = {
  externalURLs: SpotifyExternalURLS;
  followers: SpotifyFollowers;
  genres: SpotifyGenres;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  relatedArtists: SpotifyGraphQLArtist[];
  topTracks: SpotifyTrack[];
  type: 'artist';
  uri: string;
  albumsConnection: SpotifyGraphQLAlbumConnection;
};

export type SpotifyGraphQLAlbumConnection = {
  [key: string]: any;
};
