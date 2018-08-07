import { SpotifyExternalURLs, SpotifyFollowers, SpotifyImage, SpotifyGenres } from '../definitions';
import { SpotifyTrack } from '../tracks';

export type SpotifyGraphQLArtist = {
  albums: SpotifyGraphQLAlbumConnection;
  externalURLs: SpotifyExternalURLs;
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
};

export type SpotifyGraphQLAlbumConnection = {
  [key: string]: any;
};
