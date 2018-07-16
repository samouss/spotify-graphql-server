import { IResolverObject } from 'graphql-tools';
import { SpotifyAlbumType, SpotifySimplifiedAlbum } from '../../resources/spotify';
import { Context } from '../../schema';

type AlbumResolver = {
  Album: IResolverObject<SpotifySimplifiedAlbum, Context>;
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
    id: (album): string => {
      return album.id;
    },
    name: (album): string => {
      return album.name;
    },
    albumType: (album): SpotifyAlbumType => {
      return album.album_type;
    },
  },
};
