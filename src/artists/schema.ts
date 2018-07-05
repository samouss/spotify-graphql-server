import { IResolverObject } from 'graphql-tools';
import { SpotifyArtist } from '../resources/spotify';
import { Context } from '../schema';

type ArtistResolver = {
  Artist: IResolverObject<SpotifyArtist, Context>;
};

export const artistTypeDefs = [
  `

  type Artist {
    id: ID!
    name: String!
    popularity: Int!
    albums: [Album]!
  }

`,
];

export const artistResolvers: ArtistResolver = {
  Artist: {
    id: artist => artist.id,
    name: artist => artist.name,
    popularity: artist => artist.popularity,
    albums: (artist, _, context) => {
      return context.spotifyClient.getArtistAlbums({
        id: artist.id,
      });
    },
  },
};
