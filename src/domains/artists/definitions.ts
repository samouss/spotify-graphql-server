import {
  SpotifyExternalURLs,
  SpotifyFollowers,
  SpotifyImage,
  SpotifyGenres,
} from '../../definitions';
import { SpotifyGraphQLTrack } from '../tracks';

export type SpotifyGraphQLArtist = {
  albums: SpotifyGraphQLAlbumConnection;
  externalURLs: SpotifyExternalURLs;
  followers: SpotifyFollowers;
  genres: SpotifyGenres;
  href: string;
  id: string;
  image: SpotifyImage;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  relatedArtists: SpotifyGraphQLArtist[];
  topTracks: SpotifyGraphQLTrack[];
  type: 'artist';
  uri: string;
};

export type SpotifyGraphQLAlbumConnection = {
  [key: string]: any;
};
