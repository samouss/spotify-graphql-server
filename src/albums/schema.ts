import { IResolvers } from 'graphql-tools';
import { SpotifyAlbum } from '../resources/spotify';
import { Context } from '../schema';

export const albumTypeDefs = [
  `

  type Album {
    id: ID!
    name: String!
    albumType: String!
  }

`,
];

export const albumResolvers: IResolvers<SpotifyAlbum, Context> = {
  Album: {
    id: (album: SpotifyAlbum) => album.id,
    name: (album: SpotifyAlbum) => album.name,
    albumType: (album: SpotifyAlbum) => album.album_type,
  },
};
