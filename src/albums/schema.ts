import { IResolverObject } from 'graphql-tools';
import { SpotifyAlbum } from '../resources/spotify';
import { Context } from '../schema';

type AlbumResolver = {
  Album: IResolverObject<SpotifyAlbum, Context>;
};

export const albumTypeDefs = [
  `

  type Album {
    id: ID!
    name: String!
    albumType: String!
  }

`,
];

export const albumResolvers: AlbumResolver = {
  Album: {
    id: album => album.id,
    name: album => album.name,
    albumType: album => album.album_type,
  },
};
